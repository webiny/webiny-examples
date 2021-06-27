import { useCallback, useReducer } from "react";
import { useRouter } from "@webiny/react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import { PaginationProp } from "@webiny/ui/List/DataList/types";
import { LIST_CAR_MANUFACTURERS, DELETE_CAR_MANUFACTURER } from "./graphql";

/**
 * Contains essential data listing functionality - data querying and UI control.
 */

interface useCarManufacturersDataListHook {
    (): {
        carManufacturers: Array<{
            id: string;
            title: string;
            description: string;
            createdOn: string;
            [key: string]: any;
        }>;
        loading: boolean;
        pagination: PaginationProp;
        refresh: () => void;
        setSort: (sort: string) => void;
        newCarManufacturer: () => void;
        editCarManufacturer: (id: string) => void;
        deleteCarManufacturer: (id: string) => void;
        currentCarManufacturerId: string;
    };
}

const reducer = (prev, next) => ({ ...prev, ...next });

export const useCarManufacturersDataList: useCarManufacturersDataListHook = () => {
    // Base state and UI React hooks.
    const { history } = useRouter();
    const { showSnackbar } = useSnackbar();
    const { showConfirmation } = useConfirmationDialog();
    const [variables, setVariables] = useReducer(reducer, {
        limit: undefined,
        after: undefined,
        before: undefined,
        sort: undefined
    });

    const searchParams = new URLSearchParams(location.search);
    const currentCarManufacturerId = searchParams.get("id");

    // Queries and mutations.
    const listQuery = useQuery(LIST_CAR_MANUFACTURERS, {
        variables,
        onError: e => showSnackbar(e.message)
    });

    const [deleteIt, deleteMutation] = useMutation(DELETE_CAR_MANUFACTURER, {
        refetchQueries: [{ query: LIST_CAR_MANUFACTURERS }]
    });

    const { data: carManufacturers = [], meta = {} } = listQuery.loading
        ? {}
        : listQuery?.data?.carManufacturers?.listCarManufacturers || {};
    const loading = [listQuery, deleteMutation].some(item => item.loading);

    // Base CRUD actions - new, edit, and delete.
    const newCarManufacturer = useCallback(() => history.push("/car-manufacturers?new"), []);
    const editCarManufacturer = useCallback(id => {
        history.push(`/car-manufacturers?id=${id}`);
    }, []);

    const deleteCarManufacturer = useCallback(
        item => {
            showConfirmation(async () => {
                try {
                    await deleteIt({
                        variables: item
                    });

                    showSnackbar(`Car Manufacturer "${item.title}" deleted.`);
                    if (currentCarManufacturerId === item.id) {
                        history.push(`/car-manufacturers`);
                    }
                } catch (e) {
                    showSnackbar(e.message);
                }
            });
        },
        [currentCarManufacturerId]
    );

    // Sorting.
    const setSort = useCallback(
        value => setVariables({ after: undefined, before: undefined, sort: value }),
        []
    );

    // Pagination metadata and controls.
    const setPreviousPage = useCallback(
        () => setVariables({ after: undefined, before: meta.before }),
        undefined
    );
    const setNextPage = useCallback(
        () => setVariables({ after: meta.after, before: undefined }),
        undefined
    );
    const setLimit = useCallback(
        value => setVariables({ after: undefined, before: undefined, limit: value }),
        []
    );

    const pagination: PaginationProp = {
        setPerPage: setLimit,
        perPageOptions: [10, 25, 50],
        setPreviousPage,
        setNextPage,
        hasPreviousPage: meta.before,
        hasNextPage: meta.after
    };

    return {
        carManufacturers,
        loading,
        refresh: listQuery.refetch,
        pagination,
        setSort,
        newCarManufacturer,
        editCarManufacturer,
        deleteCarManufacturer,
        currentCarManufacturerId
    };
};

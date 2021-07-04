import { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useRouter } from "@webiny/react-router";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import {
    GET_CAR_MANUFACTURER,
    CREATE_CAR_MANUFACTURER,
    UPDATE_CAR_MANUFACTURER,
    LIST_CAR_MANUFACTURERS
} from "./graphql";

/**
 * Contains essential form functionality - data querying and submission, and UI control.
 */

/**
 * Helps us pick only relevant properties from the submitted form data.
 * @param formData
 */
const getMutationData = formData => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdOn, savedOn, createdBy, ...data } = formData;
    return data;
};

export const useCarManufacturersForm = () => {
    const { location, history } = useRouter();
    const { showSnackbar } = useSnackbar();
    const searchParams = new URLSearchParams(location.search);
    const currentCarManufacturerId = searchParams.get("id");

    const getQuery = useQuery(GET_CAR_MANUFACTURER, {
        variables: { id: currentCarManufacturerId },
        skip: !currentCarManufacturerId,
        onError: error => {
            history.push("/car-manufacturers");
            showSnackbar(error.message);
        }
    });

    const [create, createMutation] = useMutation(CREATE_CAR_MANUFACTURER, {
        refetchQueries: [{ query: LIST_CAR_MANUFACTURERS }]
    });

    const [update, updateMutation] = useMutation(UPDATE_CAR_MANUFACTURER);

    const loading = [getQuery, createMutation, updateMutation].some(item => item.loading);

    const onSubmit = useCallback(
        async formData => {
            const { id } = formData;
            const data = getMutationData(formData);
            const [operation, options] = id
                ? [update, { variables: { id, data } }]
                : [create, { variables: { data } }];

            try {
                const result = await operation(options);
                if (!id) {
                    const { id } = result.data.carManufacturers.createCarManufacturer;
                    history.push(`/car-manufacturers?id=${id}`);
                }

                showSnackbar("Car Manufacturer saved successfully.");
            } catch (e) {
                showSnackbar(e.message);
            }
        },
        [currentCarManufacturerId]
    );

    const carManufacturer = getQuery?.data?.carManufacturers?.getCarManufacturer;
    const emptyViewIsShown = !searchParams.has("new") && !loading && !carManufacturer;
    const currentCarManufacturer = useCallback(() => history.push("/car-manufacturers?new"), []);
    const cancelEditing = useCallback(() => history.push("/car-manufacturers"), []);

    return {
        loading,
        emptyViewIsShown,
        currentCarManufacturer,
        cancelEditing,
        carManufacturer,
        onSubmit
    };
};

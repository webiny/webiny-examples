import React, { useCallback, useEffect, useMemo } from "react";
import dotProp from "dot-prop-immutable";
import { i18n } from "@webiny/app/i18n";
import {
    DataList,
    ScrollList,
    ListItem,
    ListItemText,
    ListItemTextSecondary,
    ListItemMeta,
    ListActions,
    DataListModalOverlay,
    DataListModalOverlayAction
} from "@webiny/ui/List";
import { Select } from "@webiny/ui/Select";
import { Grid, Cell } from "@webiny/ui/Grid";

import { DeleteIcon } from "@webiny/ui/List/DataList/icons";
import { ButtonIcon, ButtonSecondary } from "@webiny/ui/Button";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";
import { ReactComponent as FilterIcon } from "@webiny/app-admin/assets/icons/filter-24px.svg";
import { useRouter } from "@webiny/react-router";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CarManufacturerItem, DataListChildProps } from "../types";
import { DELETE_CAR_MANUFACTURER, LIST_CAR_MANUFACTURERS } from "./graphql";
import { removeFromListCache } from "./cache";
import { QueryResult } from "@apollo/react-common";
import { SecureView } from "@webiny/app-security/components";

const t = i18n.ns("admin-app-carManufacturer/data-list");

interface Props {
    sortBy: string;
    setSortBy: (value: string) => void;
    limit: number;
    setLimit: (value: number) => void;
    sorters: { label: string; value: string }[];
}

const extractQueryGraphQLError = (listQuery: QueryResult): string | null => {
    if (!listQuery.error || !listQuery.error.message) {
        return null;
    }
    return listQuery.error.message;
};

const CarManufacturersDataList: React.FunctionComponent<Props> = ({
    sortBy,
    setSortBy,
    limit,
    sorters
}) => {
    const { history } = useRouter();

    const { showSnackbar } = useSnackbar();
    const { showConfirmation } = useConfirmationDialog();
    const listVariables = {
        sort: [sortBy],
        limit
    };
    const listQuery = useQuery(LIST_CAR_MANUFACTURERS, {
        variables: listVariables
    });
    const [deleteCarManufacturer, deleteMutation] = useMutation(DELETE_CAR_MANUFACTURER);

    const id = new URLSearchParams(location.search).get("id");

    const deleteCarManufacturerItem = useCallback(
        (carManufacturer: CarManufacturerItem) => {
            showConfirmation(async () => {
                await deleteCarManufacturer({
                    variables: {
                        id: carManufacturer.id
                    },
                    update: (cache, response) => {
                        const error = dotProp.get(
                            response,
                            "data.carManufacturers.deleteCarManufacturer.error",
                            null
                        );
                        if (error) {
                            return showSnackbar(error.message);
                        }
                        removeFromListCache(cache, listVariables, carManufacturer);

                        showSnackbar(
                            t`CarManufacturer "{title}" deleted.`({ title: carManufacturer.title })
                        );

                        if (id === carManufacturer.id) {
                            history.push(`/carManufacturers`);
                        }
                    }
                });
            });
        },
        [id]
    );

    const sortOverlay = useMemo(
        () => (
            <DataListModalOverlay>
                <Grid>
                    <Cell span={12}>
                        <Select value={sortBy} onChange={setSortBy} label={t`Sort by`}>
                            {sorters.map(({ label, value }) => {
                                return (
                                    <option key={label} value={value}>
                                        {label}
                                    </option>
                                );
                            })}
                        </Select>
                    </Cell>
                </Grid>
            </DataListModalOverlay>
        ),
        [sortBy]
    );

    const loading = [listQuery, deleteMutation].some(item => !!item.loading);

    const data = listQuery.loading
        ? []
        : dotProp.get(listQuery, "data.carManufacturers.listCarManufacturers.data", []);
    const error = extractQueryGraphQLError(listQuery);

    // there is a possibility to receive graphql errors so show those as well
    useEffect(() => {
        if (!error) {
            return;
        }
        showSnackbar(error);
    }, [error]);

    return (
        <DataList
            loading={loading}
            title={t`CarManufacturers`}
            data={data}
            actions={
                <SecureView permission={"car-manufacturers"}>
                    {({ permission }) => {
                        if (!permission) {
                            return null;
                        }

                        // Note that the received permission object can also be `{ name: "*" }`. If so, that
                        // means we are dealing with the super admin, who has unlimited access.
                        let hasAccess = permission.name === "*";
                        if (!hasAccess) {
                            // If not super admin, let's check if we have the "r" in the `rwd` property.
                            hasAccess =
                                permission.name === "car-manufacturers" &&
                                permission.rwd &&
                                permission.rwd.includes("r");
                        }

                        // Finally, if current identity doesn't have access, we immediately exit.
                        if (!hasAccess) {
                            return null;
                        }

                        return (
                            <ButtonSecondary
                                data-testid="new-carManufacturer-button"
                                onClick={() => history.push("/car-manufacturers/?new=true")}
                            >
                                <ButtonIcon icon={<AddIcon />} /> {t`New Car Manufacturer`}
                            </ButtonSecondary>
                        );
                    }}
                </SecureView>
            }
            modalOverlay={sortOverlay}
            modalOverlayAction={<DataListModalOverlayAction icon={<FilterIcon />} />}
        >
            {({ data }: DataListChildProps) => (
                <ScrollList data-testid="carManufacturer-data-list">
                    {(data || []).map(item => (
                        <ListItem key={item.id} selected={item.id === id}>
                            <ListItemText
                                onClick={() => history.push(`/carManufacturers?id=${item.id}`)}
                            >
                                {item.title}
                                {item.description && (
                                    <ListItemTextSecondary>
                                        {item.description}
                                    </ListItemTextSecondary>
                                )}
                            </ListItemText>

                            <ListItemMeta>
                                <ListActions>
                                    <DeleteIcon onClick={() => deleteCarManufacturerItem(item)} />
                                </ListActions>
                            </ListItemMeta>
                        </ListItem>
                    ))}
                </ScrollList>
            )}
        </DataList>
    );
};

export default CarManufacturersDataList;

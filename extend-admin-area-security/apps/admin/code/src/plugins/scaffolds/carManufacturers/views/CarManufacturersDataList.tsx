import React from "react";
import { DeleteIcon } from "@webiny/ui/List/DataList/icons";
import { ButtonIcon, ButtonSecondary } from "@webiny/ui/Button";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";
import {
    DataList,
    ScrollList,
    ListItem,
    ListItemText,
    ListItemMeta,
    ListActions
} from "@webiny/ui/List";
import { useCarManufacturersDataList } from "./hooks/useCarManufacturersDataList";

import { SecureView } from "@webiny/app-security/components";

// We also imported FullAccessPermission and CarManufacturersPermission types.
import { FullAccessPermission } from "@webiny/app-security/types";
import { CarManufacturersPermission } from "../types";

/**
 * Renders a list of all CarManufacturer entries. Includes basic deletion, pagination, and sorting capabilities.
 * The data querying functionality is located in the `useCarManufacturersDataList` React hook.
 */

// By default, we are able to sort entries by time of creation (ascending and descending).
// More sorters can be added, but not that further adjustments will be needed on the GraphQL API side.
const sorters = [
    {
        label: "Newest to oldest",
        value: "createdOn_DESC"
    },
    {
        label: "Oldest to newest",
        value: "createdOn_ASC"
    }
];

const CarManufacturersDataList = () => {
    const {
        carManufacturers,
        loading,
        refresh,
        pagination,
        setSort,
        newCarManufacturer,
        editCarManufacturer,
        deleteCarManufacturer,
        currentCarManufacturerId
    } = useCarManufacturersDataList();

    return (
        <DataList
            title={"Car Manufacturers"}
            data={carManufacturers}
            loading={loading}
            refresh={refresh}
            pagination={pagination}
            sorters={sorters}
            setSorters={setSort}
            actions={
                /* The SecureView component conditionally renders child components
                (depending on the result of the permissions check we provided). */
                <SecureView<CarManufacturersPermission | FullAccessPermission>
                    permission={"car-manufacturers"}
                >
                    {({ permission }) => {
                        if (!permission) {
                            return null;
                        }

                        // Note that the received permission object can also be `{ name: "*" }`. If so, that
                        // means we are dealing with the super admin, who has unlimited access.
                        let hasAccess = permission.name === "*";
                        if (!hasAccess) {
                            // If not super admin, let's check if we have the "w" in the `rwd` property.
                            hasAccess =
                                permission.name === "car-manufacturers" &&
                                permission.rwd &&
                                permission.rwd.includes("w");
                        }

                        // Finally, if current identity doesn't have access, we immediately exit.
                        if (!hasAccess) {
                            return null;
                        }

                        return (
                            <ButtonSecondary onClick={newCarManufacturer}>
                                <ButtonIcon icon={<AddIcon />} />
                                New Car Manufacturer
                            </ButtonSecondary>
                        );
                    }}
                </SecureView>
            }
        >
            {({ data }) => (
                <ScrollList>
                    {data.map(item => (
                        <ListItem key={item.id} selected={item.id === currentCarManufacturerId}>
                            <ListItemText onClick={() => editCarManufacturer(item.id)}>
                                {item.title}
                            </ListItemText>

                            <ListItemMeta>
                                <ListActions>
                                    <SecureView<CarManufacturersPermission | FullAccessPermission>
                                        permission={"car-manufacturers"}
                                    >
                                        {({ permission }) => {
                                            if (!permission) {
                                                return null;
                                            }

                                            // Note that the received permission object can also be `{ name: "*" }`. If so, that
                                            // means we are dealing with the super admin, who has unlimited access.
                                            let hasAccess = permission.name === "*";
                                            if (!hasAccess) {
                                                // If not super admin, let's check if we have the "d" in the `rwd` property.
                                                hasAccess =
                                                    permission.name === "car-manufacturers" &&
                                                    permission.rwd &&
                                                    permission.rwd.includes("d");
                                            }

                                            // Finally, if current identity doesn't have access, we immediately exit.
                                            if (!hasAccess) {
                                                return null;
                                            }

                                            return (
                                                <DeleteIcon
                                                    onClick={() => deleteCarManufacturer(item)}
                                                />
                                            );
                                        }}
                                    </SecureView>
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

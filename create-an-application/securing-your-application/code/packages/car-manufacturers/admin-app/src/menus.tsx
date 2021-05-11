import React from "react";
import { AdminMenuPlugin } from "@webiny/app-admin/types";

// Note that we've changed the icon (this one is more appropriate).
import { ReactComponent as Icon } from "./assets/directions_car-24px.svg";

import { useSecurity } from "@webiny/app-security";

// We use this when specifying the return types of the getPermission function call (below).
import { FullAccessPermission } from "@webiny/app-security/types";

// Creating types for security permissions makes our code less error-prone and more readable.
import { CarManufacturersPermission } from "./types";

export default (): AdminMenuPlugin => ({
    type: "admin-menu",
    name: "admin-menu-car-manufacturers",
    render({ Menu, Item }) {
        const { identity } = useSecurity();

        // We get the "car-manufacturers" permission from current identity (logged in user).
        const permission = identity.getPermission<
            CarManufacturersPermission | FullAccessPermission
        >("car-manufacturers");

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
            <Menu name="menu-car-manufacturers" label={"Car Manufacturers"} icon={<Icon />}>
                <Item label={"Car Manufacturers"} path={"/car-manufacturers"} />
            </Menu>
        );
    }
});

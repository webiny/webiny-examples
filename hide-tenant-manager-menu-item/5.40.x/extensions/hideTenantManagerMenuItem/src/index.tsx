import React from "react";
import { AddMenu, Plugins, useSecurity } from "@webiny/app-serverless-cms";

const HideMenuItems = AddMenu.createDecorator(Original => {
    return function AddMenu(props) {
        const security = useSecurity();

        if (props.name === "tenantManager") {
            const isFullAccess = security.getPermission("*");
            if (!isFullAccess) {
                return null;
            }
        }

        return <Original {...props} />;
    };
});

export const Extension = () => {
    return (
        <Plugins>
            <HideMenuItems />
        </Plugins>
    );
};

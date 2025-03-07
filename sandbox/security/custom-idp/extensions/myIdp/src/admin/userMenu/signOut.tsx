import React from "react";
import { useSecurity } from "@webiny/app-serverless-cms";
import { ListItem, ListItemGraphic } from "@webiny/ui/List";
import { Icon } from "@webiny/ui/Icon";
import { ReactComponent as SignOutIcon } from "./assets/round-lock_open-24px.svg";

export const SignOut = () => {
    const { identity } = useSecurity();
    if (!identity) {
        return null;
    }

    if (typeof identity.logout !== "function") {
        console.warn(`Missing "logout" function implementation in SecurityIdentity!`);
        return null;
    }

    return (
        <ListItem onClick={identity.logout}>
            <ListItemGraphic>{<Icon icon={<SignOutIcon />} />}</ListItemGraphic>
            Sign out
        </ListItem>
    );
};

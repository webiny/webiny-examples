import React from "react";
import { useSecurity } from "@webiny/app-serverless-cms";
import { Avatar } from "@webiny/ui/Avatar";

export const UserImage = () => {
    const { identity } = useSecurity();
    if (!identity) {
        return null;
    }

    const { displayName } = identity;

    return <Avatar alt={displayName} fallbackText={displayName} />;
};

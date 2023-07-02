import React from "react";
import { Admin } from "@webiny/app-serverless-cms";
import { Cognito } from "@webiny/app-admin-users-cognito";
import "./App.scss";

/* Import and enable the plugin. */
import { ActionHandlerPlugin } from "./internalLink/InternalLinkPlugin";

export const App: React.FC = () => {
    return (
        <Admin>
            <Cognito />
            <ActionHandlerPlugin />
        </Admin>
    );
};

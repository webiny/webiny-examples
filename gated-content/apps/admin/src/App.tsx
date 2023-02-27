import React from "react";
import { Admin } from "@webiny/app-serverless-cms";
import { Cognito } from "@webiny/app-admin-users-cognito";
import { WebsiteSecurityManager, ContentModule, HeadlessCMS } from "@demo/admin";
import "./App.scss";

export const App: React.FC = () => {
    return (
        <Admin>
            <Cognito />
            <WebsiteSecurityManager />
            <ContentModule name="articles" label={"Articles"} />
            <HeadlessCMS />
        </Admin>
    );
};

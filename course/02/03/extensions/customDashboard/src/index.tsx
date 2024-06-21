import React from "react";
import { Dashboard } from "@webiny/app-serverless-cms";

// Can actually also be added in the above import.
import { useSecurity } from "@webiny/app-security";

// Create a component plugin (decorator).
const MyDashboard = Dashboard.createDecorator(() => {
    return function MyDashboard() {
        const { identity } = useSecurity();

        return <h3>Hi, {identity?.displayName}!</h3>;
    };
});

export const Extension = () => (
    <>
        <MyDashboard />
    </>
);
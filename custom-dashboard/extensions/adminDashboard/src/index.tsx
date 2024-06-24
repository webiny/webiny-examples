import React from "react";
import { Dashboard, useSecurity } from "@webiny/app-serverless-cms";

// We create a new decorator called MyDashboard
const MyDashboard = Dashboard.createDecorator(() => {
    return function MyDashboard() {
        const { identity } = useSecurity();

        return (
            <div style={{ padding: 50, textAlign: "center" }}>
                <h3>Hi, {identity?.displayName}!</h3>
            </div>
        );
    };
});

export const Extension = () => (
    <>
        <MyDashboard />
    </>
);

import React from "react";
import { MyIdpLoginScreenRenderer } from "./admin/MyIdpLoginScreenRenderer";
import { UserMenuModule } from "./admin/userMenu";

export const MyIdp = () => {
    return (
        <>
            <MyIdpLoginScreenRenderer />
            <UserMenuModule />
        </>
    );
};

import React from "react";
import { AddLogo, useTags } from "@webiny/app-serverless-cms";

// Import your logo image
import logoPng from "./logo.png";
import logoNavigationPng from "./logo-navigation.png";

const MyLogo = () => {
    // Fetch tags from context.
    const { location } = useTags();

    return <img src={logoPng} height={40} width={40} />;
};

export const Extension = () => (
    <>
        <AddLogo logo={<MyLogo />} />
    </>
);
import React from "react";
import { AddLogo, useTags } from "@webiny/app-serverless-cms";

// Import your logo image
import logoPng from "./logo.png";
import logoNavigationPng from "./logo-navigation.png";

const MyLogo = () => {
    // Fetch tags from context.
    const { location } = useTags();

    // "location" is a tag with a value of "navigation", if your logo is currently being rendered inside the navigation drawer.
    if (location === "navigation") {
        return <img src={logoNavigationPng} height={50} width={100} />;
    }

    return <img src={logoPng} height={40} width={40} />;
};

export const Extension = () => (
    <>
        <AddLogo logo={<MyLogo />} />
    </>
);
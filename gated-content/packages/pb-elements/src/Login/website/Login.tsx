import React from "react";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import { LoginElementData } from "../types";
import { LoginScreen } from "./LoginScreen";

// The renderer React component.
export const Login = createRenderer(() => {
    // Let's retrieve the variables that were chosen by
    // the user upon dropping the page element onto the page.
    const { getElement } = useRenderer();
    const element = getElement<LoginElementData>();

    return <LoginScreen signupGroup={element.data.signupGroup} type={element.data.type} />;
});

import React from "react";
import styled from "@emotion/styled";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import loginWithSignup from "./images/login-with-signup.png";
import loginWithoutSignup from "./images/login-without-signup.png";
import signup from "./images/signup.png";
import { LoginElementData } from "../types";

const Preview = styled.div`
    display: flex;
    justify-content: center;
    /* This is to avoid parent element border overlap (to be fixed). */
    > img {
        margin: 4px;
    }
`;

type PreviewMap = { [K in LoginElementData["type"]]: string };

const previewMap: PreviewMap = {
    "login-with-signup": loginWithSignup,
    login: loginWithoutSignup,
    signup
};

// The renderer React component.
export const Login = createRenderer(() => {
    // Let's retrieve the variables that were chosen by
    // the user upon dropping the page element onto the page.
    const { getElement } = useRenderer();
    const element = getElement<LoginElementData>();

    return (
        <Preview>
            <img src={previewMap[element.data.type]} />
        </Preview>
    );
});

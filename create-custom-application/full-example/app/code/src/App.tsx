import React from "react";
import { ApolloProvider } from "@apollo/react-components";
import { Routes } from "@webiny/app/components/Routes";
import { BrowserRouter } from "@webiny/react-router";
import { createApolloClient } from "./apollo";
import Authenticator from "./components/Authenticator";
import { SecurityProvider } from "@webiny/app-security";

// An entrypoint for all SCSS styles your application might have.
import "./App.scss";
import "antd/dist/antd.css";

// The beginning of our React application, where we mount a couple of useful providers.
// If needed, feel free to add new or modify existing providers.
export const App = () => (
    <>
        {/*
            <SecurityProvider> is a generic provider of identity information. 3rd party identity providers (like Cognito,
            Okta, Auth0) will handle the authentication, and set the information about the user into this provider,
            so other parts of the system have a centralized place to fetch user information from.
        */}
        <SecurityProvider>
            <Authenticator>
                {/* Sets up a new Apollo GraphQL client, pointed to an existing GraphQL API. */}
                <ApolloProvider
                    client={createApolloClient({ uri: process.env.REACT_APP_GRAPHQL_API_URL })}
                >
                    {/* Enables routing in our application. */}
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <Routes />
                    </BrowserRouter>
                </ApolloProvider>
            </Authenticator>
        </SecurityProvider>
    </>
);

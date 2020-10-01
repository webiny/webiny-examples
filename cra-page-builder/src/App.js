import React from "react";

// Page component only serves for rendering of the page data returned by the API
import { Page } from "@webiny/app-page-builder/site/components/Page";

// PageBuilder "renderPlugins" render individual page elements (text, images, columns, etc.)
import renderPlugins from "@webiny/app-page-builder/render/presets/default";

// Page Builder "themePlugins" are responsible for Header, Footer, page layout, typography, etc.
import themePlugins from "@webiny/app-page-builder-theme";

// Form Builder plugins for Form functionality, like triggers and validators
import formsSitePlugins from "@webiny/app-form-builder/site/plugins";

// Form Builder plugins to handle "form" element when Form is used in Page Builder
import formsPbPlugins from "@webiny/app-form-builder/page-builder/site/plugins";

// Form Builder "theme" contains the default form layout and is responsible for all the styles, etc.
import formBuilderTheme from "@webiny/app-form-builder-theme";

// "imagePlugin" is used to render <img> DOM elements and generate srcSet for different image dimensions
import imagePlugin from "@webiny/app/plugins/imagePlugin";

// BrowserRouter is required because links are rendered via a <Link> component, which detects internal site links
// and triggers data preloading via GraphQL, so when you click on a link - transition is instant
// Note that we reexport "react-router" to add some more functionality on top of it.
import { BrowserRouter } from "@webiny/react-router";
import { I18NProvider } from "@webiny/app-i18n/contexts/I18N";

// This is a global plugins registry
import { registerPlugins } from "@webiny/plugins";

// App specific stuff
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";

import "./App.scss";

// IMPORTANT: to use with CRA - you'll first need to install `node-sass`
import "@webiny/app-page-builder-theme/styles.scss";

const link = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API,
});

const authLink = setContext((_, { headers }) => {
    const token = "myTOken";
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
    credentials: "same-origin",
});

// Register Webiny plugins
registerPlugins(
    renderPlugins(),
    themePlugins(),
    imagePlugin(),
    formsSitePlugins(),
    formsPbPlugins(),
    formBuilderTheme()
);

function App() {
    return (
        <ApolloProvider client={client}>
            <I18NProvider>
                {/* Mount BrowserRouter, as it is currently a requirement. */}
                <BrowserRouter>
                    <Page url="/blog/for-developers" />
                </BrowserRouter>
            </I18NProvider>
        </ApolloProvider>
    );
}

export default App;

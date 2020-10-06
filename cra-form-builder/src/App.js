import React from "react";

// Importing @webiny packages here.
import { Form } from "@webiny/app-form-builder/components/Form";
import formBuilderTheme from "@webiny/app-form-builder-theme";
import "@webiny/app-form-builder-theme/styles.scss";
import { registerPlugins } from "@webiny/plugins";

// Form component depends on the Apollo client, which is defined via the Apollo Provider.
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

// Used below in the code.
const WEBINY_API_URL = "https://d2yb6c8c0wrwtd.cloudfront.net/graphql";
const UNIQUE_FORM_SLUG = "test-form-8k8t178q3";

// Theme files are collection of plugins, so they have to registered. Note that they don't automatically include SCSS
// files, that's why they are imported manually above.
registerPlugins(formBuilderTheme());

// Create the Apollo client.
const client = new ApolloClient({
    // Point the Apollo Client to your API.
    uri: WEBINY_API_URL
});

// Render the App component.
function App() {
    return (
        <ApolloProvider client={client}>
            <div style={{ width: 500, margin: "0 auto", textAlign: "center" }}>
                <h1>Forms in a simple React app</h1>
                <Form slug={UNIQUE_FORM_SLUG} />
            </div>
        </ApolloProvider>
    );
}

export default App;

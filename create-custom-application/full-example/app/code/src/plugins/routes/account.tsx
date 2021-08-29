import React from "react";
import { RoutePlugin } from "@webiny/app/plugins/RoutePlugin";
import { Route } from "@webiny/react-router";
import Layout from "../../components/Layout";

// The home page.
function Account() {
    return (
        <Layout className={'account'}>

        </Layout>
    );
}

// We register routes via the `RoutePlugin` plugin.
export default new RoutePlugin({
    route: <Route path="/account" exact component={Account} />
});

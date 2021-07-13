import React, { Suspense, lazy } from "react";
import Helmet from "react-helmet";
import { Route } from "@webiny/react-router";
import { CircularProgress } from "@webiny/ui/Progress";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import { RoutePlugin } from "@webiny/app/plugins/RoutePlugin";
import { SecureRoute } from "@webiny/app-security/components";

/**
 * Registers new "/car-manufacturers" route.
 */

const Loader = ({ children, ...props }) => (
    <Suspense fallback={<CircularProgress />}>{React.cloneElement(children, props)}</Suspense>
);

const CarManufacturers = lazy(() => import("./views"));

export default new RoutePlugin({
    route: (
        <Route
            path={"/car-manufacturers"}
            exact
            render={() => (
                // In order to be able to access this route, the logged in user needs to
                // have the "car-manufacturers" permission. We don't inspect the extra
                // properties it may hold, we do that within rendered child components.
                <SecureRoute permission={"car-manufacturers"}>
                    <AdminLayout>
                        <Helmet>
                            <title>Car Manufacturers</title>
                        </Helmet>
                        <Loader>
                            <CarManufacturers />
                        </Loader>
                    </AdminLayout>
                </SecureRoute>
            )}
        />
    )
});

import React, { Suspense, lazy } from "react";
import Helmet from "react-helmet";
import { Route } from "@webiny/react-router";
import { RoutePlugin } from "@webiny/app/types";
import { CircularProgress } from "@webiny/ui/Progress";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import { SecureRoute } from "@webiny/app-security/components";

const Loader = ({ children, ...props }) => (
    <Suspense fallback={<CircularProgress />}>{React.cloneElement(children, props)}</Suspense>
);

const CarManufacturers = lazy(() => import("./views/CarManufacturers"));

export default (): RoutePlugin => ({
    type: "route",
    name: "route-admin-car-manufacturers",
    route: (
        <Route
            path={"/car-manufacturers"}
            exact
            render={() => (
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

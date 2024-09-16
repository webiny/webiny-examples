import React from "react";
import { Plugins, AddRoute, AddMenu } from "@webiny/app-admin";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import { Languages } from "./Languages";

export const LanguageModule = () => {
    return (
        <Plugins>
            <AddRoute
                path={"/page-builder/languages"}
                element={
                    <AdminLayout>
                        <Languages />
                    </AdminLayout>
                }
            />
            <AddMenu name="pageBuilder">
                <AddMenu name="pageBuilder.pages">
                    <AddMenu
                        name={"pageBuilder.languages"}
                        label={"Languages"}
                        path={"/page-builder/languages"}
                    />
                </AddMenu>
            </AddMenu>
        </Plugins>
    );
};

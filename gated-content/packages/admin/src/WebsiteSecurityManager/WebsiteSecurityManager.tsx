import { AddMenu as Menu, AddRoute, Layout, Plugin } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import React from "react";
import {
    AdminUsersPermissions,
    PERMISSION_WEBSITE_USERS,
    PERMISSION_WEBSITE_GROUPS
} from "./AdminUsersPermissions";
import { Groups } from "./Groups";
import { Users } from "./Users";

export const WebsiteSecurityManager = () => {
    return (
        <>
            <AdminUsersPermissions />
            <Plugin>
                <HasPermission name={PERMISSION_WEBSITE_USERS}>
                    <AddRoute path={"/website/users"}>
                        <Layout title={"Website Users"}>
                            <Users />
                        </Layout>
                    </AddRoute>
                    <Menu name={"settings"}>
                        <Menu name={"cp.website"} label={"Website"}>
                            <Menu
                                name={"cp.websiteUsers"}
                                label={"Users"}
                                path={"/website/users"}
                            />
                        </Menu>
                    </Menu>
                </HasPermission>
                <HasPermission name={PERMISSION_WEBSITE_GROUPS}>
                    <AddRoute path={"/website/groups"}>
                        <Layout title={"Website Groups"}>
                            <Groups />
                        </Layout>
                    </AddRoute>
                    <Menu name={"settings"}>
                        <Menu name={"cp.website"} label={"Website"}>
                            <Menu
                                name={"cp.websiteGroups"}
                                label={"Groups"}
                                path={"/website/groups"}
                            />
                        </Menu>
                    </Menu>
                </HasPermission>
            </Plugin>
        </>
    );
};

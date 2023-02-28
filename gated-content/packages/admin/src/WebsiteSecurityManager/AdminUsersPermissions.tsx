import React, { useEffect } from "react";
import { PermissionRendererPlugin } from "@webiny/app-admin";
import { AccordionItem } from "@webiny/ui/Accordion";
import { ReactComponent as GroupIcon } from "@material-design-icons/svg/outlined/security.svg";
import { ReactComponent as UserIcon } from "@material-design-icons/svg/outlined/people.svg";
import { plugins } from "@webiny/plugins";
import { PermissionAccessSwitcher } from "./PermissionAccessSwitcher";

export const PERMISSION_WEBSITE_GROUPS = "cp.websiteGroups";
export const PERMISSION_WEBSITE_USERS = "cp.websiteUsers";

const cpPermissionsPlugin = new PermissionRendererPlugin({
    render(params) {
        return (
            <>
                <AccordionItem
                    icon={<GroupIcon />}
                    title={"Website User Groups"}
                    description={"Manage access to website apps."}
                >
                    {/* When `Full Access` is selected, the specified `permissionName` will be assigned to the group. */}
                    <PermissionAccessSwitcher
                        permissionName={PERMISSION_WEBSITE_GROUPS}
                        {...params}
                    />
                </AccordionItem>
                <AccordionItem
                    icon={<UserIcon />}
                    title={"Website Users"}
                    description={"Manage website users."}
                >
                    {/* When `Full Access` is selected, the specified `permissionName` will be assigned to the group. */}
                    <PermissionAccessSwitcher
                        permissionName={PERMISSION_WEBSITE_USERS}
                        {...params}
                    />
                </AccordionItem>
            </>
        );
    }
});

export const AdminUsersPermissions: React.FC = () => {
    useEffect(() => {
        plugins.register(cpPermissionsPlugin);
    }, []);

    return null;
};

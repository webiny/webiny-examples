import React, { useEffect } from "react";
import { PermissionRendererPlugin } from "@webiny/app-admin";
import { AccordionItem } from "@webiny/ui/Accordion";
import { ReactComponent as AppIcon } from "@material-design-icons/svg/outlined/apps.svg";
import { plugins } from "@webiny/plugins";
import { PermissionAccessSwitcher } from "./PermissionAccessSwitcher";

interface ContentModuleProps {
    name: string;
    label: string;
}

export const ContentModule = ({ name, label }: ContentModuleProps) => {
    useEffect(() => {
        const plugin = new WebsitePermissionRendererPlugin({
            render(props) {
                return (
                    <AccordionItem
                        icon={<AppIcon />}
                        title={`${label} App`}
                        description={`Manage access to the ${label} app.`}
                    >
                        <PermissionAccessSwitcher permissionName={`cp.apps.${name}`} {...props} />
                    </AccordionItem>
                );
            }
        });

        plugins.register(plugin);

        return () => {
            plugins.unregister(plugin.name as string);
        };
    }, []);
    return null;
};

/**
 * We extend the built-in admin app permission plugin to be able to differentiate between them.
 */
export class WebsitePermissionRendererPlugin extends PermissionRendererPlugin {
    public static override readonly type: string = "admin-app-website-permissions-renderer";
}

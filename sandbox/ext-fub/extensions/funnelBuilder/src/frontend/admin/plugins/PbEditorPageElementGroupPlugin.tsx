import React from "react";
import { legacyPluginToReactComponent } from "@webiny/app/utils";

interface PbEditorPageElementGroupPlugin {
    name: string;
    title: string;
    icon: React.ReactNode;
    emptyView?: React.ReactNode;
}

export const PbEditorPageElementGroupPlugin =
    legacyPluginToReactComponent<PbEditorPageElementGroupPlugin>({
        pluginType: "pb-editor-page-element-group",
        componentDisplayName: "PbEditorPageElementGroupPlugin",
        mapProps: props => {
            const { title, icon, emptyView } = props;
            return {
                ...props,
                group: {
                    title,
                    icon,
                    emptyView
                }
            };
        }
    });

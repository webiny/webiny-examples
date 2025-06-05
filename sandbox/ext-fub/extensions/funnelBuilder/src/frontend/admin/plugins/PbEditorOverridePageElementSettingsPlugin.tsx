import { useMemo } from "react";
import { plugins } from "@webiny/plugins";
import { Plugin } from "@webiny/plugins/types";

import { PbEditorPageElementSettingsPlugin } from "@webiny/app-page-builder/types";

interface PbEditorOverridePageElementSettingsPluginProps
    extends Pick<PbEditorPageElementSettingsPlugin, "renderAction"> {
    settings: string;
}

export const PbEditorOverridePageElementSettingsPlugin = (
    props: PbEditorOverridePageElementSettingsPluginProps
) => {
    useMemo(() => {
        const pluginNameToOverride = `pb-editor-page-element-settings-${props.settings}`;
        const originalByType = plugins.byType.bind(plugins);
        const originalByName = plugins.byName.bind(plugins);

        plugins.byType = function byType<T extends Plugin>(type: T["type"]) {
            if (type !== "pb-editor-page-element-settings") {
                return originalByType<any>(type);
            }

            const originalResult = originalByType(type);
            return originalResult.map(plugin => {
                if (plugin.name !== pluginNameToOverride) {
                    return plugin;
                }

                return {
                    ...plugin,
                    ...props
                };
            });
        };

        plugins.byName = function byName<T extends Plugin>(name: T["name"]) {
            const originalResult = originalByName<T>(name);
            if (!originalResult) {
                return null;
            }

            return {
                ...originalResult,
                renderAction: props.renderAction
            };
        };
    }, [props.settings]);

    return null;
};

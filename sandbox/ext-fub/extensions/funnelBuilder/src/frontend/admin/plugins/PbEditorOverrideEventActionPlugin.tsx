import { useMemo } from "react";
import { plugins } from "@webiny/plugins";
import { PbEditorEventActionPlugin } from "@webiny/app-page-builder/types";

interface PbEditorOverrideActionPluginProps
    extends Pick<PbEditorEventActionPlugin, "onEditorMount"> {
    action: string;
}

export const PbEditorOverrideActionHandlerPlugin = (props: PbEditorOverrideActionPluginProps) => {
    useMemo(() => {
        const originalByType = plugins.byType.bind(plugins);

        plugins.byType = type => {
            if (type !== "pb-editor-event-action-plugin") {
                return originalByType<any>(type);
            }

            const originalResult = originalByType(type);
            const pluginNameToOverride = `pb-editor-event-action-${props.action}`;
            return originalResult.map(plugin => {
                if (plugin.name !== pluginNameToOverride) {
                    return plugin;
                }

                return {
                    ...plugin,
                    ...props
                } as PbEditorEventActionPlugin;
            });
        };
    }, [props.action]);

    return null;
};

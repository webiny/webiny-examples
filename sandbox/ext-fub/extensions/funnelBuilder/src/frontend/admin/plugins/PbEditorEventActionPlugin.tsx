import { legacyPluginToReactComponent } from "@webiny/app/utils";
import { PbEditorEventActionPlugin as BasePbEditorEventActionPlugin } from "@webiny/app-page-builder/types";

type PbEditorEventActionPlugin = Pick<
    BasePbEditorEventActionPlugin,
    "onEditorMount" | "onEditorUnmount"
>;

export const PbEditorEventActionPlugin = legacyPluginToReactComponent<PbEditorEventActionPlugin>({
    pluginType: "pb-editor-event-action-plugin",
    componentDisplayName: "PbEditorEventActionPlugin"
});

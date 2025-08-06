import React from "react";
import { legacyPluginToReactComponent } from "@webiny/app/utils";

export type RenderSettingsComponent = React.ComponentType<{
    afterChangeLabel: (value: string) => void;
    uniqueFieldIdValidator: (fieldId: string) => void;
}>;

export interface PbEditorFunnelFieldSettingsPluginProps {
    fieldType: string;
    renderer: RenderSettingsComponent;
}

export const PbEditorFunnelFieldSettingsPlugin =
    legacyPluginToReactComponent<PbEditorFunnelFieldSettingsPluginProps>({
        pluginType: "pb-editor-funnel-field-settings",
        componentDisplayName: "PbEditorFunnelFieldSettingsPlugin"
    });

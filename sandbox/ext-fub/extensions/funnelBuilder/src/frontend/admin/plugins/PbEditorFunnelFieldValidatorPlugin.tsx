import { legacyPluginToReactComponent } from "@webiny/app/utils";
import * as React from "react";
import { FunnelFieldDefinitionModel } from "../../../shared/models/FunnelFieldDefinitionModel";

export type RenderSettings = React.ComponentType<{
    setMessage: (message: string) => void;
    field?: FunnelFieldDefinitionModel;
}>;

export interface PbEditorFunnelFieldValidatorPluginProps {
    validatorType: string;
    label: string;
    description: string;
    settingsRenderer?: RenderSettings;
}

export const PbEditorFunnelFieldValidatorPlugin =
    legacyPluginToReactComponent<PbEditorFunnelFieldValidatorPluginProps>({
        pluginType: "pb-editor-funnel-field-validator",
        componentDisplayName: "PbEditorFunnelFieldValidatorPlugin"
    });

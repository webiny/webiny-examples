import { legacyPluginToReactComponent } from "@webiny/app/utils";
import * as React from "react";
import { FunnelFieldDefinitionModelDto } from "../../../shared/models/FunnelFieldDefinitionModel";
import { FunnelConditionOperatorModel } from "../../../shared/models/FunnelConditionOperatorModel";
import { FunnelModelDto } from "../../../shared/models/FunnelModel";

export type ConditionOperatorParamsComponent = React.ComponentType<{
    funnel: FunnelModelDto;
    field?: FunnelFieldDefinitionModelDto;
}>;

export interface PbEditorFunnelConditionOperatorPluginProps {
    operatorClass: typeof FunnelConditionOperatorModel<any, any>;
    settingsRenderer?: ConditionOperatorParamsComponent;
}

export const PbEditorFunnelConditionOperatorPlugin =
    legacyPluginToReactComponent<PbEditorFunnelConditionOperatorPluginProps>({
        pluginType: "pb-editor-funnel-condition-operator",
        componentDisplayName: "PbEditorFunnelConditionOperatorPlugin"
    });

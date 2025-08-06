import { legacyPluginToReactComponent } from "@webiny/app/utils";
import * as React from "react";
import { FunnelConditionActionModel } from "../../../shared/models/FunnelConditionActionModel";
import { FunnelModelDto } from "../../../shared/models/FunnelModel";

export type ConditionActionParamsComponent = React.ComponentType<{ funnel: FunnelModelDto }>;

export interface PbEditorFunnelConditionActionPluginProps {
    actionClass: typeof FunnelConditionActionModel<any>;
    settingsRenderer?: ConditionActionParamsComponent;
}

export const PbEditorFunnelConditionActionPlugin =
    legacyPluginToReactComponent<PbEditorFunnelConditionActionPluginProps>({
        pluginType: "pb-editor-funnel-condition-action",
        componentDisplayName: "PbEditorFunnelConditionActionPlugin"
    });

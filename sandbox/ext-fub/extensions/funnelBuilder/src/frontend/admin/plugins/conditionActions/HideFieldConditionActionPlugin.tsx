import React from "react";
import {
    ConditionActionParamsComponent,
    PbEditorFunnelConditionActionPlugin
} from "../PbEditorFunnelConditionActionPlugin";
import { HideFieldConditionAction } from "../../../../shared/models/conditionActions/HideFieldConditionAction";
import { Bind } from "@webiny/form";
import { Select } from "@webiny/ui/Select";

const ActionSettings: ConditionActionParamsComponent = ({ funnel }) => {
    return (
        <Bind name={"extra.targetFieldId"}>
            <Select placeholder={"Select target field..."} size={"small"}>
                {funnel.fields.map(field => (
                    <option key={field.id} value={field.id}>
                        {field.label}
                    </option>
                ))}
            </Select>
        </Bind>
    );
};

export const HideFieldConditionActionPlugin = () => {
    return (
        <PbEditorFunnelConditionActionPlugin
            actionClass={HideFieldConditionAction}
            settingsRenderer={ActionSettings}
        />
    );
};

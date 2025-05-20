import React from "react";
import {
    ConditionActionParamsComponent,
    PbEditorFunnelConditionActionPlugin
} from "../PbEditorFunnelConditionActionPlugin";
import { DisableFieldConditionAction } from "../../../../shared/models/conditionActions/DisableFieldConditionAction";
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

export const DisableFieldConditionActionPlugin = () => {
    return (
        <PbEditorFunnelConditionActionPlugin
            actionClass={DisableFieldConditionAction}
            settingsRenderer={ActionSettings}
        />
    );
};

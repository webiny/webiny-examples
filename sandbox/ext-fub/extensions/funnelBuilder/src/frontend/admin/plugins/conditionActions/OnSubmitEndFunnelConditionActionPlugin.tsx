import React from "react";
import {
    ConditionActionParamsComponent,
    PbEditorFunnelConditionActionPlugin
} from "../PbEditorFunnelConditionActionPlugin";
import { OnSubmitEndFunnelConditionAction } from "../../../../shared/models/conditionActions/OnSubmitEndFunnelConditionAction";
import { Bind } from "@webiny/form";
import { Select } from "@webiny/ui/Select";
import { isSuccessStepElementType } from "../../../../shared/constants";

const ActionSettings: ConditionActionParamsComponent = ({ funnel }) => {
    return (
        <Bind name={"extra.evaluationStep"}>
            <Select placeholder={"Evaluate upon submitting step..."} size={"small"}>
                {funnel.steps
                    .filter(step => !isSuccessStepElementType(step.id))
                    .map(step => (
                        <option key={step.id} value={step.id}>
                            {step.title}
                        </option>
                    ))}
            </Select>
        </Bind>
    );
};

export const OnSubmitEndFunnelConditionActionPlugin = () => {
    return (
        <PbEditorFunnelConditionActionPlugin
            actionClass={OnSubmitEndFunnelConditionAction}
            settingsRenderer={ActionSettings}
        />
    );
};

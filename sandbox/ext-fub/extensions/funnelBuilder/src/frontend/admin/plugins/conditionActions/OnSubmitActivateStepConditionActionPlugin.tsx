import React from "react";
import {
    ConditionActionParamsComponent,
    PbEditorFunnelConditionActionPlugin
} from "../PbEditorFunnelConditionActionPlugin";
import { OnSubmitActivateStepConditionAction } from "../../../../shared/models/conditionActions/OnSubmitActivateStepConditionAction";
import { Bind } from "@webiny/form";
import { Select } from "@webiny/ui/Select";
import styled from "@emotion/styled";
import { isSuccessStepElementType } from "../../../../shared/constants";

const Wrapper = styled.div`
    display: flex;
    column-gap: 10px;
`;

const ActionSettings: ConditionActionParamsComponent = ({ funnel }) => {
    const funnelSteps = funnel.steps.filter(step => !isSuccessStepElementType(step.id));

    return (
        <Wrapper>
            <Bind name={"extra.targetStepId"}>
                <Select placeholder={"Select target step..."} size={"small"}>
                    {funnelSteps.map(step => (
                        <option key={step.id} value={step.id}>
                            {step.title}
                        </option>
                    ))}
                </Select>
            </Bind>
            <Bind name={"extra.evaluationStep"}>
                <Select placeholder={"Evaluate upon submitting step..."} size={"small"}>
                    {funnelSteps.map(step => (
                        <option key={step.id} value={step.id}>
                            {step.title}
                        </option>
                    ))}
                </Select>
            </Bind>
        </Wrapper>
    );
};

export const OnSubmitActivateStepConditionActionPlugin = () => {
    return (
        <PbEditorFunnelConditionActionPlugin
            actionClass={OnSubmitActivateStepConditionAction}
            settingsRenderer={ActionSettings}
        />
    );
};

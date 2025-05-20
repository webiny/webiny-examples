import React from "react";
import {
    PbEditorFunnelConditionOperatorPlugin,
    ConditionOperatorParamsComponent
} from "../PbEditorFunnelConditionOperatorPlugin";
import { EqConditionOperator } from "../../../../shared/models/conditionOperators/EqConditionOperator";
import { Input } from "@webiny/ui/Input";
import { Bind } from "@webiny/form";
import styled from "@emotion/styled";

const Wrapper = styled.div`
    width: 200px;
`;

const OperatorSettings: ConditionOperatorParamsComponent = () => {
    return (
        <Wrapper>
            <Bind name={"extra.value"}>
                <Input
                    rootProps={{ style: { width: 200 } }}
                    size={"small"}
                    placeholder={"Enter value"}
                />
            </Bind>
        </Wrapper>
    );
};

export const EqConditionOperatorPlugin = () => {
    return (
        <PbEditorFunnelConditionOperatorPlugin
            operatorClass={EqConditionOperator}
            settingsRenderer={OperatorSettings}
        />
    );
};

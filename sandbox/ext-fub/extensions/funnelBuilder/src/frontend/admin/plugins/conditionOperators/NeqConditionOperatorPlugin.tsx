import React from "react";
import {
    PbEditorFunnelConditionOperatorPlugin,
    ConditionOperatorParamsComponent
} from "../PbEditorFunnelConditionOperatorPlugin";
import { NeqConditionOperator } from "../../../../shared/models/conditionOperators/NeqConditionOperator";
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

export const NeqConditionOperatorPlugin = () => {
    return (
        <PbEditorFunnelConditionOperatorPlugin
            operatorClass={NeqConditionOperator}
            settingsRenderer={OperatorSettings}
        />
    );
};

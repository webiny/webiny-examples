import React from "react";
import {
    PbEditorFunnelConditionOperatorPlugin,
    ConditionOperatorParamsComponent
} from "../PbEditorFunnelConditionOperatorPlugin";
import { NotIncludesConditionOperator } from "../../../../shared/models/conditionOperators/NotIncludesConditionOperator";
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
                <Input rootProps={{ style: { width: 200 } }} size={"small"} placeholder={"Value"} />
            </Bind>
        </Wrapper>
    );
};

export const NotIncludesConditionOperatorPlugin = () => {
    return (
        <PbEditorFunnelConditionOperatorPlugin
            operatorClass={NotIncludesConditionOperator}
            settingsRenderer={OperatorSettings}
        />
    );
};

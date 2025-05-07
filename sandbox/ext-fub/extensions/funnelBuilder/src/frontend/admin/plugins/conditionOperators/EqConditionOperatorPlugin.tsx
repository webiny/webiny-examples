import React from "react";
import {
    PbEditorFunnelConditionOperatorPlugin,
    ConditionOperatorParamsComponent
} from "../PbEditorFunnelConditionOperatorPlugin";
import { EqConditionOperator } from "../../../../shared/models/conditionOperators/EqConditionOperator";
import { Input } from "@webiny/ui/Input";
import { Bind } from "@webiny/form";

const OperatorSettings: ConditionOperatorParamsComponent = () => {
    return (
        <Bind name={"extra.value"}>
            <Input size={"small"} />
        </Bind>
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

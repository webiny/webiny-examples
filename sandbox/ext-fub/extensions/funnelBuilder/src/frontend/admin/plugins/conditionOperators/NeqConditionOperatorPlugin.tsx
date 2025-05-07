import React from "react";
import {
    PbEditorFunnelConditionOperatorPlugin,
    ConditionOperatorParamsComponent
} from "../PbEditorFunnelConditionOperatorPlugin";
import { Input } from "@webiny/ui/Input";
import { Bind } from "@webiny/form";
import { NeqConditionOperator } from "../../../../shared/models/conditionOperators/NeqConditionOperator";

const OperatorSettings: ConditionOperatorParamsComponent = () => {
    return (
        <Bind name={"extra.value"}>
            <Input size={"small"} />
        </Bind>
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

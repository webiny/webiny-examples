import React from "react";
import { EqConditionOperatorPlugin } from "./EqConditionOperatorPlugin";
import { NeqConditionOperatorPlugin } from "./NeqConditionOperatorPlugin";

export const ConditionOperatorPlugins = () => {
    return (
        <>
            <EqConditionOperatorPlugin />
            <NeqConditionOperatorPlugin />
        </>
    );
};

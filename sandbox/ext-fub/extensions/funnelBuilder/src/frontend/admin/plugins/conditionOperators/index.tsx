import React from "react";
import { EqConditionOperatorPlugin } from "./EqConditionOperatorPlugin";
import { NeqConditionOperatorPlugin } from "./NeqConditionOperatorPlugin";
import { IncludesConditionOperatorPlugin } from "./IncludesConditionOperatorPlugin";
import { NotIncludesConditionOperatorPlugin } from "./NotIncludesConditionOperatorPlugin";

export const ConditionOperatorPlugins = () => {
    return (
        <>
            <EqConditionOperatorPlugin />
            <IncludesConditionOperatorPlugin />
            <NeqConditionOperatorPlugin />
            <NotIncludesConditionOperatorPlugin />
        </>
    );
};

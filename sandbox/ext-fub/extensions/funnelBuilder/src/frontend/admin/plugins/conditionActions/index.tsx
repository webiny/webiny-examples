import React from "react";
import { DisableFieldConditionActionPlugin } from "./DisableFieldConditionActionPlugin";
import { HideFieldConditionActionPlugin } from "./HideFieldConditionActionPlugin";
import { OnSubmitActivateStepConditionActionPlugin } from "./OnSubmitActivateStepConditionActionPlugin";
import { OnSubmitEndFunnelConditionActionPlugin } from "./OnSubmitEndFunnelConditionActionPlugin";

export const ConditionActionPlugins = () => {
    return (
        <>
            <DisableFieldConditionActionPlugin />
            <HideFieldConditionActionPlugin />
            <OnSubmitActivateStepConditionActionPlugin />
            <OnSubmitEndFunnelConditionActionPlugin />
        </>
    );
};

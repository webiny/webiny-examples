import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { StepWebsiteRenderer } from "./StepWebsiteRenderer";
import { STEP_ELEMENT_TYPE } from "../../../../shared/constants";

export const StepWebsitePlugins = () => (
    <PbRenderElementPlugin elementType={STEP_ELEMENT_TYPE} renderer={StepWebsiteRenderer} />
);

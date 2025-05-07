import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { ControlsRenderer } from "./ControlsRenderer";
import { ELEMENT_TYPE } from "./constants";

export const ControlsWebsitePlugins = () => (
    <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={ControlsRenderer} />
);

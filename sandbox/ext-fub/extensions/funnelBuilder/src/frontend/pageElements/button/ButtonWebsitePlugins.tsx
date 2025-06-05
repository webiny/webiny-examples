import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { ButtonRenderer } from "./ButtonRenderer";
import { ELEMENT_TYPE } from "./constants";

export const ButtonWebsitePlugins = () => (
    <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={ButtonRenderer} />
);

import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-website";
import { ContainerWebsiteRenderer } from "./ContainerWebsiteRenderer";
import { CONTAINER_ELEMENT_TYPE } from "../../../../shared/constants";

export const ContainerWebsitePlugins = () => (
    <PbRenderElementPlugin
        elementType={CONTAINER_ELEMENT_TYPE}
        renderer={ContainerWebsiteRenderer}
    />
);

import React from "react";
import { ContainerWebsitePlugins } from "./frontend/pageElements/container/website/ContainerWebsitePlugins";
import { TextFieldWebsitePlugins } from "./frontend/pageElements/fields/text/TextFieldWebsitePlugins";
import { TextareaFieldWebsitePlugins } from "./frontend/pageElements/fields/textarea/TextareaFieldWebsitePlugins";
import { CheckboxGroupFieldWebsitePlugins } from "./frontend/pageElements/fields/checkboxGroup/CheckboxGroupFieldWebsitePlugins";
import { ControlsWebsitePlugins } from "./frontend/pageElements/controls/ControlsWebsitePlugins";
import { ButtonWebsitePlugins } from "./frontend/pageElements/button/ButtonWebsitePlugins";

import { StepWebsitePlugins } from "./frontend/pageElements/step/website/StepWebsitePlugins";

export const Extension = () => (
    <>
        {/* Container Page Element */}
        <ContainerWebsitePlugins />
        <StepWebsitePlugins />

        {/* Fields. */}
        <TextFieldWebsitePlugins />
        <TextareaFieldWebsitePlugins />
        <CheckboxGroupFieldWebsitePlugins />
        <ControlsWebsitePlugins />
        <ButtonWebsitePlugins />
    </>
);

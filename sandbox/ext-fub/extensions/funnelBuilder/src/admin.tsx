import React from "react";
import { ContainerAdminPlugins } from "./frontend/pageElements/container/admin/ContainerAdminPlugins";
import { StepAdminPlugins } from "./frontend/pageElements/step/admin/StepAdminPlugins";
import { ButtonAdminPlugins } from "./frontend/pageElements/button/ButtonAdminPlugins";
import { TextFieldAdminPlugins } from "./frontend/pageElements/fields/text/TextFieldAdminPlugins";
import { TextareaFieldAdminPlugins } from "./frontend/pageElements/fields/textarea/TextareaFieldAdminPlugins";
import { CheckboxGroupFieldAdminPlugins } from "./frontend/pageElements/fields/checkboxGroup/CheckboxGroupFieldAdminPlugins";
import { FunnelBuilderPageElementGroup } from "./frontend/pageElements/FunnelBuilderPageElementGroup";
import { DecoratedElementControls } from "./frontend/pageElements/ElementControlsDecorator";
import { FieldValidatorPlugins } from "./frontend/admin/plugins/fieldValidators";
import { ConditionOperatorPlugins } from "./frontend/admin/plugins/conditionOperators";
import { ConditionActionPlugins } from "./frontend/admin/plugins/conditionActions";
import { PbEditorOverrideEventActionPlugins } from "./frontend/admin/plugins/editorActionOverrides";
import { ControlsAdminPlugins } from "./frontend/pageElements/controls/ControlsAdminPlugins";
import { ThemeSettingsProvider } from "./frontend/admin/ThemeSettingsProvider";

export const Extension = () => (
    <>
        {/* Fields. */}
        <TextFieldAdminPlugins />
        <TextareaFieldAdminPlugins />
        <CheckboxGroupFieldAdminPlugins />
        <ControlsAdminPlugins />
        <ButtonAdminPlugins />

        {/* Container Page Element */}
        <ContainerAdminPlugins />
        <StepAdminPlugins />

        {/* Other */}
        <FieldValidatorPlugins />
        <ConditionOperatorPlugins />
        <ConditionActionPlugins />
        <FunnelBuilderPageElementGroup />
        <DecoratedElementControls />
        <PbEditorOverrideEventActionPlugins />
        <ThemeSettingsProvider />
    </>
);

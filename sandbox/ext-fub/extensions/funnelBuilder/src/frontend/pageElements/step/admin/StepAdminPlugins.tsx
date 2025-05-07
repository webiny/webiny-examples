import React from "react";
import { PbEditorPageElementPlugin, PbRenderElementPlugin } from "@webiny/app-page-builder";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { StepAdminRenderer } from "./StepAdminRenderer";
import { createStepElement } from "../../../../shared/createStepElement";
import { CONTAINER_ELEMENT_TYPE, STEP_ELEMENT_TYPE } from "../../../../shared/constants";

export const StepAdminPlugins = () => (
    <>
        <PbRenderElementPlugin elementType={STEP_ELEMENT_TYPE} renderer={StepAdminRenderer} />
        <PbEditorPageElementPlugin
            elementType={STEP_ELEMENT_TYPE}
            renderer={StepAdminRenderer}
            settings={[
                "pb-editor-page-element-settings-delete",
                "pb-editor-page-element-settings-visibility",
                "pb-editor-page-element-style-settings-padding",
                "pb-editor-page-element-style-settings-margin",
                "pb-editor-page-element-style-settings-width",
                "pb-editor-page-element-style-settings-height",
                "pb-editor-page-element-style-settings-background"
            ]}
            target={[CONTAINER_ELEMENT_TYPE]}
            canReceiveChildren={true}
            onCreate={OnCreateActions.OPEN_SETTINGS}
            create={() => createStepElement()}
            // We don't want to allow deleting the step element.
            canDelete={() => false}
        />
    </>
);

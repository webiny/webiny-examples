import React from "react";
import {
    PbEditorPageElementAdvancedSettingsPlugin,
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder";
import { ButtonRenderer } from "./ButtonRenderer";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { ButtonAdvancedSettings } from "./ButtonAdvancedSettings";
import { ELEMENT_TYPE } from "./constants";
import { FUB_PAGE_ELEMENT_GROUP } from "../fields/utils";
import { ButtonElementData } from "./types";
import { ReactComponent as ButtonIcon } from "@material-design-icons/svg/outlined/arrow_circle_right.svg";
import { ElementToolbarPreview } from "../ElementToolbarPreview";

const INITIAL_ELEMENT_DATA: ButtonElementData = {
    action: "submit"
};

export const ButtonAdminPlugins = () => (
    <>
        <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={ButtonRenderer} />
        <PbEditorPageElementPlugin
            elementType={ELEMENT_TYPE}
            renderer={ButtonRenderer}
            toolbar={{
                title: "Button",
                group: FUB_PAGE_ELEMENT_GROUP,
                preview() {
                    return (
                        <ElementToolbarPreview
                            title={"Button"}
                            description={"Submits the form"}
                            icon={<ButtonIcon />}
                        />
                    );
                }
            }}
            // Defines which types of element settings are available to the user.
            settings={[
                "pb-editor-page-element-settings-delete",
                "pb-editor-page-element-settings-visibility",
                "pb-editor-page-element-style-settings-padding",
                "pb-editor-page-element-style-settings-margin",
                "pb-editor-page-element-style-settings-width",
                "pb-editor-page-element-style-settings-height",
                "pb-editor-page-element-style-settings-background"
            ]}
            // Defines onto which existing elements our element can be dropped.
            // In most cases, using `["cell", "block"]` will suffice.
            target={["cell", "block"]}
            onCreate={OnCreateActions.OPEN_SETTINGS}
            // `create` function creates the initial data for the page element.
            create={options => {
                return {
                    type: ELEMENT_TYPE,
                    elements: [],
                    data: INITIAL_ELEMENT_DATA,
                    ...options
                };
            }}
        />
        <PbEditorPageElementAdvancedSettingsPlugin
            elementType={ELEMENT_TYPE}
            element={<ButtonAdvancedSettings />}
        />
    </>
);

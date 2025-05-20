import React from "react";
import { PbEditorPageElementPlugin, PbRenderElementPlugin } from "@webiny/app-page-builder";
import { ControlsRenderer } from "./ControlsRenderer";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { ELEMENT_TYPE } from "./constants";
import { FUB_PAGE_ELEMENT_GROUP } from "../fields/utils";
import { ReactComponent as ControlsIcon } from "@material-design-icons/svg/outlined/swap_horiz.svg";
import { ElementToolbarPreview } from "../ElementToolbarPreview";

export const ControlsAdminPlugins = () => (
    <>
        <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={ControlsRenderer} />
        <PbEditorPageElementPlugin
            elementType={ELEMENT_TYPE}
            renderer={ControlsRenderer}
            toolbar={{
                title: "Controls",
                group: FUB_PAGE_ELEMENT_GROUP,
                preview() {
                    return (
                        <ElementToolbarPreview
                            title={"Controls"}
                            description={"Submits the form"}
                            icon={<ControlsIcon />}
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
                    data: { settings: {} },
                    ...options
                };
            }}
        />
    </>
);

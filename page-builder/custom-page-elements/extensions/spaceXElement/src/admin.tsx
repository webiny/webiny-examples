import React from "react";
import {
    PbEditorPageElementAdvancedSettingsPlugin,
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder";
import { SpaceX, SpaceXElementData } from "./SpaceX";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { Element } from "@webiny/app-page-builder-elements/types";
import { AdvancedSettings } from "./admin/AdvancedSettings";

const INITIAL_ELEMENT_DATA: SpaceXElementData = {
    variables: { type: "rockets", limit: "10", offset: "0" }
};

export const Extension = () => (
    <>
        <PbRenderElementPlugin elementType={"spaceX"} render={SpaceX} />
        <PbEditorPageElementPlugin
            elementType={"spaceX"}
            render={({ element }) => <SpaceX element={element as Element} />}
            toolbar={{
                // We use `pb-editor-element-group-media` to put our new
                // page element into the Media group in the left sidebar.
                title: "SpaceX",
                group: "pb-editor-element-group-media",
                preview() {
                    // We can return any JSX / React code here. To keep it
                    // simple, we are simply returning the element's name.
                    return <>Space X Page Element</>;
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
                    type: "spaceX",
                    elements: [],
                    data: INITIAL_ELEMENT_DATA,
                    ...options
                };
            }}
        />
        <PbEditorPageElementAdvancedSettingsPlugin
            elementType={"spaceX"}
            element={<AdvancedSettings />}
        />
    </>
);

import React from "react";
import {
    PbEditorPageElementAdvancedSettingsPlugin,
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder";
import { CmsEntries, INITIAL_ELEMENT_DATA } from "./CmsEntries";
import { CmsEntriesAdvancedSettings } from "./admin/CmsEntriesAdvancedSettings";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { ModelFieldsAdvancedSettings } from "./admin/ModelFieldsAdvancedSettings";

export const Extension = () => (
    <>
        <PbRenderElementPlugin elementType={"cms-entries"} renderer={CmsEntries} />
        <PbEditorPageElementAdvancedSettingsPlugin
            elementType={"cms-entries"}
            element={<CmsEntriesAdvancedSettings />}
        />

        <PbEditorPageElementPlugin
            elementType={"cms-entries"}
            renderer={CmsEntries}
            toolbar={{
                // We use `pb-editor-element-group-media` to put our new
                // page element into the Media group in the left sidebar.
                title: "CmsEntries",
                group: "pb-editor-element-group-media",
                preview() {
                    // We can return any JSX / React code here. To keep it
                    // simple, we are simply returning the element's name.
                    return <>CMS Entries</>;
                }
            }}
            // Defines onto which existing elements our element can be dropped.
            // In most cases, using `["cell", "block"]` will suffice.
            target={["cell", "block"]}
            onCreate={OnCreateActions.OPEN_SETTINGS}
            // `create` function creates the initial data for the page element.
            create={options => {
                return {
                    type: "cms-entries",
                    elements: [],
                    data: INITIAL_ELEMENT_DATA,
                    ...options
                };
            }}
        />

        {["paragraph", "heading", "image", "button"].map(elementType => (
            <PbEditorPageElementAdvancedSettingsPlugin
                key={elementType}
                elementType={elementType}
                element={<ModelFieldsAdvancedSettings />}
            />
        ))}
    </>
);

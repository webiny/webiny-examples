import React from "react";
import { PbEditorPageElementSettingsPlugin } from "@webiny/app-page-builder/types";
import Action from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Action";
import { ReactComponent as CssClassIcon } from "./style-icon.svg";
import Settings from "./Settings";

export default () =>
    ({
         type: "pb-editor-page-element-settings",
        // Unique name for the plugin.
        name: "pb-editor-page-element-settings-css-class",
        // A function to render an action item in the editor toolbar.
        renderAction() {
            return <Action tooltip={"CSS class"} plugin={this.name} icon={<CssClassIcon />} />;
        },
        // A function to render an settings menu in the editor.
        renderMenu() {
            return <Settings />;
        },
        // We'll set it to true, because we want this "setting" to be available for all page elements.
        elements: true
    } as PbEditorPageElementSettingsPlugin);

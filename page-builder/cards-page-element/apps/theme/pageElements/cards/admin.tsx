import React from "react";
import {
    PbEditorPageElementPlugin,
    PbEditorPageElementAdvancedSettingsPlugin
} from "@webiny/app-page-builder/types";

import { Cards, CardsElementData } from "./Cards";
import { CardsSettings } from "./admin/CardsSettings";

// Let's have at least one card in the cards list. In the settings component,
// we don't allow deletion if there's only one card in the list.
const INITIAL_ELEMENT_DATA: CardsElementData = {
    variables: { cards: [{ title: "", image: {} }] }
};

export default [
    // The `PbEditorPageElementPlugin` plugin.
    {
        name: "pb-editor-page-element-space-x",
        type: "pb-editor-page-element",
        elementType: "cards",
        render: Cards,
        toolbar: {
            // We use `pb-editor-element-group-media` to put our new
            // page element into the Media group in the left sidebar.
            title: "Cards",
            group: "pb-editor-element-group-media",
            preview() {
                // We can return any JSX / React code here. To keep it
                // simple, we are simply returning the element's name.
                return <>Space X Page Element</>;
            }
        },

        // Defines which types of element settings are available to the user.
        settings: [
            "pb-editor-page-element-settings-delete",
            "pb-editor-page-element-settings-visibility",
            "pb-editor-page-element-style-settings-padding",
            "pb-editor-page-element-style-settings-margin",
            "pb-editor-page-element-style-settings-width",
            "pb-editor-page-element-style-settings-height",
            "pb-editor-page-element-style-settings-background"
        ],

        // Defines onto which existing elements our element can be dropped.
        // In most cases, using `["cell", "block"]` will suffice.
        target: ["cell", "block"],
        onCreate: "open-settings",

        // `create` function creates the initial data for the page element.
        create(options) {
            return {
                type: "cards",
                elements: [],
                data: INITIAL_ELEMENT_DATA,
                ...options
            };
        }
    } as PbEditorPageElementPlugin,

    // The `PbEditorPageElementAdvancedSettingsPlugin` plugin.
    {
        name: "pb-editor-page-element-advanced-settings-space-x",
        type: "pb-editor-page-element-advanced-settings",
        elementType: "cards",
        render(props) {
            return <CardsSettings {...props}/>;
        }
    } as PbEditorPageElementAdvancedSettingsPlugin
];

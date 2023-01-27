import React from "react";
import { validation } from "@webiny/validation";
import { Input } from "@webiny/ui/Input";
import { ButtonPrimary } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Select } from "@webiny/ui/Select";
import {
    PbEditorPageElementAdvancedSettingsPlugin,
    PbEditorPageElementPlugin
} from "@webiny/app-page-builder/types";

import { SpaceX, SpaceXElementData } from "./SpaceX";

const INITIAL_ELEMENT_DATA: SpaceXElementData = {
    variables: { type: "rockets", limit: "10", offset: "0" }
};

export default [
    {
        name: "pb-editor-page-element-space-x",
        type: "pb-editor-page-element",
        elementType: "spaceX",
        render: SpaceX,
        toolbar: {
            // We use `pb-editor-element-group-media` to put our plugin into the Media group.
            title: "SpaceX",
            group: "pb-editor-element-group-media",
            preview() {
                return <>Space X Page Element</>;
            }
        },
        settings: [
            "pb-editor-page-element-settings-delete",
            "pb-editor-page-element-settings-visibility",
            "pb-editor-page-element-style-settings-padding",
            "pb-editor-page-element-style-settings-margin",
            "pb-editor-page-element-style-settings-width",
            "pb-editor-page-element-style-settings-height",
            "pb-editor-page-element-style-settings-background"
        ],
        target: ["cell", "block"],
        onCreate: "open-settings",
        create(options) {
            /*
            Create function is here to create the initial data
            for the page element, which then is utilized in the
            example page element component and in the settings dialog.
        */
            return {
                type: "spaceX",
                elements: [],
                data: INITIAL_ELEMENT_DATA,
                ...options
            };
        }
    } as PbEditorPageElementPlugin,
    {
        name: "pb-editor-page-element-advanced-settings-space-x",
        type: "pb-editor-page-element-advanced-settings",
        elementType: "spaceX",
        render({ Bind, submit }) {
            return (
                <>
                    <Grid>
                        <Cell span={12}>
                            <Bind name={"variables.type"}>
                                <Select
                                    label={"Type"}
                                    description={"Chose the record type you want to query."}
                                >
                                    <option value="rockets">Rockets</option>
                                    <option value="dragons">Dragons</option>
                                </Select>
                            </Bind>
                        </Cell>
                        <Cell span={12}>
                            <Bind
                                name={"variables.limit"}
                                validators={validation.create("required,gte:0,lte:1000")}
                            >
                                <Input
                                    label={"Limit"}
                                    type="number"
                                    description={"Number of records to be returned."}
                                />
                            </Bind>
                        </Cell>
                        <Cell span={12}>
                            <Bind
                                name={"variables.offset"}
                                validators={validation.create("required,gte:0,lte:1000")}
                            >
                                <Input
                                    label={"Offset"}
                                    type="number"
                                    description={"Amount of records to be skipped."}
                                />
                            </Bind>
                        </Cell>
                        <Cell span={12}>
                            <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
                        </Cell>
                    </Grid>
                </>
            );
        }
    } as PbEditorPageElementAdvancedSettingsPlugin,
];

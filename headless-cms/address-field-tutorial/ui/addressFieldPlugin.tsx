import React from "react";
import {CmsEditorFieldTypePlugin} from "@webiny/app-headless-cms/types";

const AddressIcon: React.FunctionComponent = () => (<i>icon</i>);

export default(): CmsEditorFieldTypePlugin => ({
    type: "cms-editor-field-type",
    name: "cms-editor-field-type-address",
    field: {
        type: "address",
        label: "Address",
        description: "Search for the address",
        icon: <AddressIcon />,
        allowMultipleValues: false,
        allowPredefinedValues: false,
        multipleValuesLabel: "Use as list of addresses",
        createField() {
            return {
                type: "address",
                validation: [],
                renderer: {
                    name: ""
                }
            };
        }
    }
});
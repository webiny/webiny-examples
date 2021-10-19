import React from "react";
import { CmsEditorFieldTypePlugin } from "@webiny/app-headless-cms/types";

const TextIcon: React.FunctionComponent = () => <i>icon</i>;

export default (): CmsEditorFieldTypePlugin => ({
  type: "cms-editor-field-type",
  name: "cms-editor-field-type-secret-text",
  field: {
    type: "secret-text",
    label: "Secret Text",
    description: "Store encrypted text into the database.",
    icon: <TextIcon />,
    allowMultipleValues: false,
    allowPredefinedValues: false,
    multipleValuesLabel: "Use as a list of text values",
    createField() {
      return {
        type: "secret-text",
        validation: [],
        renderer: {
          name: ""
        }
      };
    }
  }
});
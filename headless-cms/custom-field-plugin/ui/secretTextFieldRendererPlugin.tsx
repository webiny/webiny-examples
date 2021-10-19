import React from "react";
import { CmsEditorFieldRendererPlugin } from "@webiny/app-headless-cms/types";
import { Input } from "@webiny/ui/Input";

export default (): CmsEditorFieldRendererPlugin => ({
  type: "cms-editor-field-renderer",
  name: "cms-editor-field-renderer-secret-text",
  renderer: {
    rendererName: "secret-text",
    name: `Secret Text`,
    description: `Enter the text to encrypt`,
    canUse({ field }) {
      return field.type === "secret-text";
    },
    render({ field, getBind }) {
      const Bind = getBind();

      return (
        <Bind>
          {bind => (
            <Input
              {...bind}
              label={field.label}
              placeholder={field.placeholderText}
              description={field.helpText}
            />
          )}
        </Bind>
      );
    }
  }
});
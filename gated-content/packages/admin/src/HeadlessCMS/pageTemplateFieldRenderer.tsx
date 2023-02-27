import React from "react";
import {
    CmsEditorFieldRendererPlugin,
    CmsEditorFieldRendererProps
} from "@webiny/app-headless-cms/types";
import { Select } from "@webiny/ui/Select";
import { usePageTemplates } from "./usePageTemplates";

const SelectPageTemplate = ({ getBind, field }: CmsEditorFieldRendererProps) => {
    const Bind = getBind();

    const { options } = usePageTemplates();

    return (
        <Bind>
            <Select
                label={field.label}
                placeholder={field.placeholderText || "Select a value"}
                description={field.helpText}
                options={options}
            />
        </Bind>
    );
};

export const pageTemplateFieldRenderer: CmsEditorFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-category-selector",
    renderer: {
        rendererName: "page-template-selector",
        name: "Page Template Selector",
        description: `Renders a selector for a page template.`,
        canUse({ field }) {
            return field.type === "text" && !field.multipleValues;
        },
        render(props) {
            return <SelectPageTemplate {...props} />;
        }
    }
};

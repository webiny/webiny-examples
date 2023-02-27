import React from "react";
import { CmsEditorFieldRendererPlugin } from "@webiny/app-headless-cms/types";
import { Tags } from "@webiny/ui/Tags";

export const tagsFieldRenderer: CmsEditorFieldRendererPlugin[] = [
    {
        type: "cms-editor-field-renderer",
        name: "cms-editor-field-renderer-tags",
        renderer: {
            rendererName: "tags",
            name: "Tags",
            description: `Renders a tags component.`,
            canUse({ field }) {
                return (
                    field.type === "text" &&
                    field.multipleValues === true &&
                    !field.predefinedValues?.enabled
                );
            },
            render({ field, getBind }) {
                const Bind = getBind();

                return (
                    <Bind defaultValue={[]}>
                        <Tags
                            label={field.label}
                            placeholder={field.placeholderText || "Add values"}
                            description={field.helpText}
                        />
                    </Bind>
                );
            }
        }
    }
];

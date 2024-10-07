import React from "react";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { useForm } from "@webiny/form";

const { FieldElement } = ContentEntryEditorConfig;

type VideoInputType = "url" | "upload" | undefined;

const ConditionalRenderer = FieldElement.createDecorator(Original => {
    return function ConditionalRender(props) {
        const form = useForm();
        const videoInputType = form.getValue("videoType") as VideoInputType;

        const field = props.field;

        if (field.fieldId === "video") {
            const renderer = videoInputType === "url" ? "text-input" : "file-input";

            return (
                <Original
                    {...props}
                    field={{
                        ...field,
                        renderer: {
                            name: renderer
                        }
                    }}
                />
            );
        }

        return <Original {...props} />;
    };
});

export const Extension = () => {
    return (
        <>
            <ContentEntryEditorConfig>
                <ConditionalRenderer modelIds={["conditionalRenderer"]} />
            </ContentEntryEditorConfig>
        </>
    );
};

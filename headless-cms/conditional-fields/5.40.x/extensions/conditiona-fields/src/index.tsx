import React from "react";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { useForm } from "@webiny/form";

const { FieldElement } = ContentEntryEditorConfig;

type VideoInputType = "url" | "upload" | undefined;

const ConditionalFields = FieldElement.createDecorator(Original => {
    return function ConditionalRender(props) {
        const form = useForm();
        const videoInputType = form.getValue("videoType") as VideoInputType;

        const field = props.field;

        if (field.fieldId === "videoUrl" && videoInputType !== "url") {
            return null;
        }

        if (field.fieldId === "videoUpload" && videoInputType !== "upload") {
            return null;
        }

        return <Original {...props} />;
    };
});

export const Extension = () => {
    return (
        <>
            <ContentEntryEditorConfig>
                <ConditionalFields modelIds={["conditionalFields"]} />
            </ContentEntryEditorConfig>
        </>
    );
};

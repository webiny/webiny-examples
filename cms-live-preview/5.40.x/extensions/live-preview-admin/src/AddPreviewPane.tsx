import React from "react";
import styled from "@emotion/styled";
import { useModel } from "@webiny/app-headless-cms";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { PreviewPane } from "./PreviewPane";
import { getPreviewUrl } from "./getPreviewUrl";

const { ContentEntry } = ContentEntryEditorConfig;

const SplitView = styled.div`
    display: flex;
    > div {
        flex: 1;
    }
`;

export const AddPreviewPane = ContentEntry.ContentEntryForm.createDecorator(Original => {
    return function ContentEntryForm(props) {
        const { model } = useModel();

        if (model.modelId !== "article") {
            return <Original {...props} />;
        }

        return (
            <SplitView>
                <PreviewPane previewUrl={getPreviewUrl(window.location.origin)} />
                <div>
                    <Original {...props} />
                </div>
            </SplitView>
        );
    };
});

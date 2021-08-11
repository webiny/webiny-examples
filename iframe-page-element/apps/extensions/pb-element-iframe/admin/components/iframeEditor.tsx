import React from "react";
import { css } from "emotion";
import styled from "@emotion/styled";
import { ElementRoot } from "@webiny/app-page-builder/render/components/ElementRoot";
import { ReactComponent as IFrameIcon } from "../assets/iframe-icon.svg";

const outerWrapper = css({
    boxSizing: "border-box"
});

const PreviewBox = styled("div")({
    textAlign: "center",
    height: 50,
    svg: {
        height: 50,
        width: 50,
        color: "var(--mdc-theme-text-secondary-on-background)"
    }
});

const IframeEditor = props => {
    const { element } = props;

    if (!element.data.iframe.url) {
        return (
            <PreviewBox>
                <IFrameIcon />
            </PreviewBox>
        );
    }

    return (
        <ElementRoot
            className={
                "webiny-pb-base-page-element-style webiny-pb-page-element-iframe " + outerWrapper
            }
            element={element}
        >
            <iframe src={element.data.iframe.url} width="100%" height="100%" />
        </ElementRoot>
    );
};

export default IframeEditor;

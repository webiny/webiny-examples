import React from "react";
import { css } from "emotion";
import styled from "@emotion/styled";
import { ElementRoot } from "@webiny/app-page-builder/render/components/ElementRoot";
import { ReactComponent as IFrameIcon } from "../../assets/iframe-icon.svg";

const outerWrapper = css({
    boxSizing: "border-box"
});

const innerWrapper = css({
    left: 0,
    width: "100%",
    height: "auto",
    position: "relative",
    paddingBottom: 0
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

const IFrameEmbed = props => {
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
                "webiny-pb-base-page-element-style webiny-pb-page-element-embed-iframe " +
                outerWrapper
            }
            element={element}
        >
            <div className={innerWrapper}>
                <div id={element.id} />
                <iframe
                    src={element.data.iframe.url}
                    width="100%"
                    height={element.data.iframe.height}
                />
            </div>
        </ElementRoot>
    );
};

export default IFrameEmbed;

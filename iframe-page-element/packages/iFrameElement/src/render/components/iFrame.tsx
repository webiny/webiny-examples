import React from "react";
import { css } from "emotion";
import { ElementRoot } from "@webiny/app-page-builder/render/components/ElementRoot";

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

const IFrame = ({ element }) => {
    const { data } = element;
    // If the user didn't enter a URL, let's show a simple message.
    if (!data.iframe.url) {
        return <div>IFrame URL is missing.</div>;
    }

    // Otherwise, let's render the iframe.
    return (
        <ElementRoot
            className={
                "webiny-pb-base-page-element-style webiny-pb-page-element-embed-iframe " +
                outerWrapper
            }
            element={element}
        >
            <div className={innerWrapper}>
                <div id={data.id} />
                <iframe src={data.iframe.url} width="100%" height={data.iframe.height} />
            </div>
        </ElementRoot>
    );
};

export default IFrame;

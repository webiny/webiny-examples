import React from "react";
import { css } from "emotion";
import { ElementRoot } from "@webiny/app-page-builder/render/components/ElementRoot";

const outerWrapper = css({
    boxSizing: "border-box"
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
            <iframe src={data.iframe.url} width="100%" height="100%" />
        </ElementRoot>
    );
};

export default IFrame;

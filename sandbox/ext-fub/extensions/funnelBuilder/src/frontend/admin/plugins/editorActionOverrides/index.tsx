import React from "react";
import { OverrideDropElementActionPlugin } from "./OverrideDropElementActionPlugin";
import { OverrideDeleteElementActionPlugin } from "./OverrideDeleteElementActionPlugin";

export const PbEditorOverrideEventActionPlugins = () => {
    return (
        <>
            <OverrideDeleteElementActionPlugin />
            <OverrideDropElementActionPlugin />
        </>
    );
};

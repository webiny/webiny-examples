import React from "react";
import { PbEditorOverridePageElementSettingsPlugin } from "../PbEditorOverridePageElementSettingsPlugin";

// Just for demo purposes, showing how to get the active element and conditionally render something.
// import { useActiveElement } from "@webiny/app-page-builder/editor";
const OverriddenSaveAction = () => {
    // const [activeElement] = useActiveElement();
    return null;
};

export const OverrideSaveElementSettingsPlugin = () => {
    return (
        <PbEditorOverridePageElementSettingsPlugin
            settings={"save"}
            renderAction={() => <OverriddenSaveAction />}
        />
    );
};

import React from "react";
import { OverrideSaveElementSettingsPlugin } from "./OverrideSaveElementSettingsPlugin";
import { OverrideCloneElementSettingsPlugin } from "./OverrideCloneElementSettingsPlugin";

export const PbEditorOverridePageElementSettingsPlugins = () => {
    return (
        <>
            <OverrideSaveElementSettingsPlugin />
            <OverrideCloneElementSettingsPlugin />
        </>
    );
};

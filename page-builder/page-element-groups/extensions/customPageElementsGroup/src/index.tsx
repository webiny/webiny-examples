import React from "react";
import { PbEditorPageElementGroupPlugin } from "@webiny/app-page-builder";
import { ReactComponent as MyCustomPageElementsGroupIcon } from "@material-design-icons/svg/outlined/explore.svg";

export const Extension = () => {
    return (
        <>
            <PbEditorPageElementGroupPlugin
                name={"customPageElementsGroup"}
                title={"Custom Group"}
                icon={<MyCustomPageElementsGroupIcon />}
            />
        </>
    );
};
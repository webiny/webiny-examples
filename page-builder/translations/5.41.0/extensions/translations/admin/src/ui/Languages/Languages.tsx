import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { LanguageDataList } from "./LanguageDataList";
import { LanguageForm } from "./LanguageForm";

export const Languages = () => {
    return (
        <SplitView>
            <LeftPanel>
                <LanguageDataList />
            </LeftPanel>
            <RightPanel>
                <LanguageForm />
            </RightPanel>
        </SplitView>
    );
};

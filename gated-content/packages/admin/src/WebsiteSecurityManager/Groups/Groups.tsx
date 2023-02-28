import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { GroupsDataList } from "./GroupsDataList";
import { GroupsForm } from "./GroupsForm";

export const Groups: React.FC = () => {
    return (
        <SplitView>
            <LeftPanel>
                <GroupsDataList />
            </LeftPanel>
            <RightPanel>
                <GroupsForm />
            </RightPanel>
        </SplitView>
    );
};

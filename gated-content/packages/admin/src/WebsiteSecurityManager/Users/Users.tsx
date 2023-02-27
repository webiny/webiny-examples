import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { UsersDataList } from "./UsersDataList";
import { UsersForm } from "./UsersForm";

export const Users: React.FC = () => {
    return (
        <SplitView>
            <LeftPanel>
                <UsersDataList />
            </LeftPanel>
            <RightPanel>
                <UsersForm />
            </RightPanel>
        </SplitView>
    );
};

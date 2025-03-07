import React, { Fragment } from "react";
import { AddUserMenuItem, UserMenuHandleRenderer, Plugins } from "@webiny/app-serverless-cms";
import { UserInfo } from "./userInfo";
import { SignOut } from "./signOut";
import { UserImage } from "./userImage";
import { ExitTenant } from "./exitTenant";

const MyIdpUserMenuHandleRenderer = UserMenuHandleRenderer.createDecorator(() => {
    return function MyIdpUserMenuHandleRenderer() {
        return <UserImage />;
    };
});

export const UserMenuModule = () => {
    return (
        <Fragment>
            <MyIdpUserMenuHandleRenderer />
            <Plugins>
                <AddUserMenuItem element={<UserInfo />} />
                <AddUserMenuItem element={<ExitTenant />} />
                <AddUserMenuItem element={<SignOut />} />
            </Plugins>
        </Fragment>
    );
};

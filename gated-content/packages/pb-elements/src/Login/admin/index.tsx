import React from "react";
import { validation } from "@webiny/validation";
import { ButtonPrimary } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Select } from "@webiny/ui/Select";
import { Input } from "@webiny/ui/Input";
import {
    PbEditorPageElementAdvancedSettingsPlugin,
    PbEditorPageElementPlugin
} from "@webiny/app-page-builder/types";
import { WebsiteGroupSelect } from "@demo/admin/src/WebsiteSecurityManager/WebsiteGroupSelect";
import { Login } from "./Login";
import loginWithoutSignup from "./images/login-without-signup.png";
import { LoginElementData } from "../types";

const INITIAL_ELEMENT_DATA: LoginElementData = {
    type: "login"
};

export default [
    // The `PbEditorPageElementPlugin` plugin.
    {
        name: "pb-editor-page-element-login",
        type: "pb-editor-page-element",
        elementType: "login",
        render: Login,
        toolbar: {
            // We use `pb-editor-element-group-media` to put our new
            // page element into the Media group in the left sidebar.
            title: "Login",
            group: "pb-editor-element-group-media",
            preview() {
                return <img src={loginWithoutSignup} />;
            }
        },

        // Defines which types of element settings are available to the user.
        settings: ["pb-editor-page-element-settings-delete"],

        // Defines which existing elements our element can be dropped onto.
        // In most cases, using `["cell", "block"]` will suffice.
        target: ["cell", "block"],
        onCreate: "open-settings",

        // `create` function creates the initial data for the page element.
        create(options) {
            return {
                type: "login",
                elements: [],
                data: INITIAL_ELEMENT_DATA,
                ...options
            };
        }
    } as PbEditorPageElementPlugin,

    // The `PbEditorPageElementAdvancedSettingsPlugin` plugin.
    {
        name: "pb-editor-page-element-advanced-settings-login",
        type: "pb-editor-page-element-advanced-settings",
        elementType: "login",
        render({ Bind, submit, data }) {
            // In order to construct the settings form, we're using the
            // `@webiny/form`, `@webiny/ui`, and `@webiny/validation` packages.
            return (
                <Grid>
                    <Cell span={12}>
                        <Bind name={"type"}>
                            <Select label={"Type"} description={"Chose a login form type."}>
                                <option value="login">Login</option>
                                <option value="login-with-signup">Login with Signup</option>
                                <option value="signup">Signup</option>
                            </Select>
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind
                            name={"signupGroup"}
                            validators={
                                data.type !== "login" ? validation.create("required") : undefined
                            }
                        >
                            <WebsiteGroupSelect
                                label={"Group"}
                                description={"Upon signup, assign user to this group."}
                                disabled={data.type === "login"}
                            />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={"afterSignupUrl"}>
                            <Input
                                label={"After Signup Go To"}
                                description={"After signup, redirect user to this path."}
                                disabled={data.type === "login"}
                            />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
                    </Cell>
                </Grid>
            );
        }
    } as PbEditorPageElementAdvancedSettingsPlugin
];

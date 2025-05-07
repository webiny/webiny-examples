import React from "react";
import { validation } from "@webiny/validation";
import { Bind, useForm } from "@webiny/form";
import { ButtonPrimary } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Select } from "@webiny/ui/Select";
import { BUTTON_ACTION_OPTIONS } from "./constants";

export const ButtonAdvancedSettings = () => {
    // In order to construct the settings form, we're using the
    // `@webiny/form`, `@webiny/ui`, and `@webiny/validation` packages.
    const { submit } = useForm();
    return (
        <Grid>
            <Cell span={12}>
                <Bind name={"action"} validators={validation.create("required")}>
                    <Select
                        label={"Button action"}
                        description={
                            "Select the action that will be triggered when the button is clicked."
                        }
                    >
                        {BUTTON_ACTION_OPTIONS.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                </Bind>
            </Cell>
            <Cell span={12}>
                <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
            </Cell>
        </Grid>
    );
};

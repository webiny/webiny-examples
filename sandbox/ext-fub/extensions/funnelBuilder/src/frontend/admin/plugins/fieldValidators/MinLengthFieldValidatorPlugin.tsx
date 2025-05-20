import React from "react";
import { PbEditorFunnelFieldValidatorPlugin } from "../PbEditorFunnelFieldValidatorPlugin";
import { Cell, Grid } from "@webiny/ui/Grid";
import { validation } from "@webiny/validation";
import { Input } from "@webiny/ui/Input";
import { Bind } from "@webiny/form";

const ValidatorSettings = () => {
    return (
        <Grid>
            <Cell span={12}>
                <Bind
                    name={"params.extra.threshold"}
                    validators={validation.create("required,numeric")}
                >
                    <Input
                        type={"number"}
                        label={"Value"}
                        description={"This is the minimum allowed length."}
                    />
                </Bind>
            </Cell>
        </Grid>
    );
};

export const MinLengthFieldValidatorPlugin = () => (
    <PbEditorFunnelFieldValidatorPlugin
        validatorType={"minLength"}
        label={"Min length"}
        description={"Entered value must not be shorter than the provided min length."}
        settingsRenderer={ValidatorSettings}
    />
);

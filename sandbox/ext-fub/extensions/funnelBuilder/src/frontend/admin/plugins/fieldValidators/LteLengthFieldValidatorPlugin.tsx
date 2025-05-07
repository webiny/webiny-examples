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
                        description={"This is the maximum value that will be allowed."}
                    />
                </Bind>
            </Cell>
        </Grid>
    );
};

export const LteFieldValidatorPlugin = () => (
    <PbEditorFunnelFieldValidatorPlugin
        validatorType={"lte"}
        label={"Lower or equal"}
        description={"Entered value must be equal or lower than the provided max value."}
        settingsRenderer={ValidatorSettings}
    />
);

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
                        description={"This is the minimum value that will be allowed."}
                    />
                </Bind>
            </Cell>
        </Grid>
    );
};

export const GteFieldValidatorPlugin = () => (
    <PbEditorFunnelFieldValidatorPlugin
        validatorType={"gte"}
        label={"Greater or equal"}
        description={"Entered value must be equal or greater than the provided min value."}
        settingsRenderer={ValidatorSettings}
    />
);

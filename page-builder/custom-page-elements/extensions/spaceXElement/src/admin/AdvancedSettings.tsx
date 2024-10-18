import React from "react";
import { validation } from "@webiny/validation";
import { Input } from "@webiny/ui/Input";
import { Bind, useForm } from "@webiny/form";
import { ButtonPrimary } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Select } from "@webiny/ui/Select";

export const AdvancedSettings = () => {
    // In order to construct the settings form, we're using the
    // `@webiny/form`, `@webiny/ui`, and `@webiny/validation` packages.
    const { submit } = useForm();
    return (
        <>
            <Grid>
                <Cell span={12}>
                    <Bind name={"variables.type"}>
                        <Select
                            label={"Type"}
                            description={"Chose the record type you want to query."}
                        >
                            <option value="rockets">Rockets</option>
                            <option value="dragons">Dragons</option>
                        </Select>
                    </Bind>
                </Cell>
                <Cell span={12}>
                    <Bind
                        name={"variables.limit"}
                        validators={validation.create("required,gte:0,lte:1000")}
                    >
                        <Input
                            label={"Limit"}
                            type="number"
                            description={"Number of records to be returned."}
                        />
                    </Bind>
                </Cell>
                <Cell span={12}>
                    <Bind
                        name={"variables.offset"}
                        validators={validation.create("required,gte:0,lte:1000")}
                    >
                        <Input
                            label={"Offset"}
                            type="number"
                            description={"Amount of records to be skipped."}
                        />
                    </Bind>
                </Cell>
                <Cell span={12}>
                    <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
                </Cell>
            </Grid>
        </>
    );
};

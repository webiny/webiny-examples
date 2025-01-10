import React from "react";
import { Bind, useForm } from "@webiny/form";
import { ButtonPrimary } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";

export const ModelFieldsAdvancedSettings = () => {
    const { submit } = useForm();

    return (
        <Grid>
            <Cell span={12}>
                <Bind name={"cmsModelFieldId"}>
                    <Input
                        label={"CMS Model Field ID"}
                        description={"Type the CMS model field ID."}
                    />
                </Bind>
            </Cell>
            <Cell span={12}>
                <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
            </Cell>
        </Grid>
    );
};

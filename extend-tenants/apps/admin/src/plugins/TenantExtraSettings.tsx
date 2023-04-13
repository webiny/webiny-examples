import React from "react";
import { AddTenantFormField } from "@webiny/app-tenant-manager";
import gql from "graphql-tag";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Bind } from "@webiny/form";
import { Input } from "@webiny/ui/Input";
import { Switch } from "@webiny/ui/Switch";
import { validation } from "@webiny/validation";

const tenantFormFieldsSelection = gql`
    {
        settings {
            contactFirstName
            contactLastName
            contactEmail
            createInitialContent
        }
    }
`;

const ExtraFields = () => {
    return (
        <>
            <Grid>
                <Cell span={6}>
                    <Bind
                        name={"settings.contactFirstName"}
                        defaultValue={""}
                        validators={validation.create("required,maxLength:500")}
                    >
                        <Input label={"Contact first name"} />
                    </Bind>
                </Cell>
                <Cell span={6}>
                    <Bind
                        name={"settings.contactLastName"}
                        defaultValue={""}
                        validators={validation.create("required,maxLength:500")}
                    >
                        <Input label={"Contact last name"} />
                    </Bind>
                </Cell>
            </Grid>
            <Grid>
                <Cell span={12}>
                    <Bind
                        name={"settings.contactEmail"}
                        defaultValue={""}
                        validators={validation.create("required,email")}
                    >
                        <Input label={"Contact E-mail"} />
                    </Bind>
                </Cell>
            </Grid>
            <Grid>
                <Cell span={12}>
                    <Bind
                        name={"settings.createInitialContent"}
                        defaultValue={false}
                    >
                        <Switch label={"Create initial content"} />
                    </Bind>
                </Cell>
            </Grid>
        </>
    );
};

// We render this component (register the plugin) in `../App.tsx` file.
export const TenantExtraSettings = () => {
    return (
        <AddTenantFormField
            querySelection={tenantFormFieldsSelection}
            element={<ExtraFields />}
        />
    );
};

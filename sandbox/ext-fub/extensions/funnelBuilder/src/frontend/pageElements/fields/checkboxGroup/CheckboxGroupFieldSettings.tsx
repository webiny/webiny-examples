import React from "react";
import { Cell, Grid } from "@webiny/ui/Grid";
import OptionsList from "../components/fieldSettings/OptionsList";

export const CheckboxGroupFieldSettings = () => {
    return (
        <Grid>
            <Cell span={12}>
                <OptionsList multiple />
            </Cell>
        </Grid>
    );
};

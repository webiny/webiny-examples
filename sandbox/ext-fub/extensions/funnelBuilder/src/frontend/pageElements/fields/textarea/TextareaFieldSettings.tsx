import React from "react";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Bind } from "@webiny/form";
import { Input } from "@webiny/ui/Input";

export const TextareaFieldSettings = () => {
    return (
        <Grid>
            <Cell span={12}>
                <Bind name={"extra.placeholderText"}>
                    <Input label={"Placeholder text"} description={"Placeholder text (optional)"} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={"value.value"}>
                    <Input
                        rows={4}
                        label={"Default value"}
                        description={"Default value (optional)"}
                    />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={"extra.rows"}>
                    <Input
                        type={"number"}
                        label={"Text area rows"}
                        description={"Default value (optional)"}
                    />
                </Bind>
            </Cell>
        </Grid>
    );
};

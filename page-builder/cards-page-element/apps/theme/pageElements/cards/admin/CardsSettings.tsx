import React from "react";
import { Typography } from "@webiny/ui/Typography";
import { Input } from "@webiny/ui/Input";
import { Cell, Grid } from "@webiny/ui/Grid";
import { DynamicFieldset } from "@webiny/ui/DynamicFieldset";
import { ButtonPrimary, ButtonSecondary } from "@webiny/ui/Button";
import { BindComponent } from "@webiny/form";
import { validation } from "@webiny/validation";
import styled from "@emotion/styled";

// This component enables us to pick an image via Webiny's File Manager app.
import SingleImageUpload from "@webiny/app-admin/components/SingleImageUpload";

// Some custom styling.
const Styles = styled.div`
  .mdc-layout-grid {
    padding: 15px !important;

    .mdc-layout-grid__inner {
      display: grid !important;
    }

    .remove-button {
      text-align: right;
    }
`;

type Props = {
    Bind: BindComponent;
    data: any;
    submit: () => void;
};

export const CardsSettings: React.VFC<Props> = ({ Bind, submit }) => {
    return (
        <Styles>
            <Bind name={"variables.cards"}>
                <DynamicFieldset>
                    {({ actions, row }) => (
                        <>
                            {row(({ index }) => (
                                <>
                                    <Grid>
                                        <Cell span={4} align={"middle"}>
                                            <Typography use={"overline"}>
                                                Card #{index + 1}
                                            </Typography>
                                        </Cell>
                                        <Cell span={8} className={"remove-button"}>
                                            {index > 0 && (
                                                <>
                                                    <ButtonSecondary
                                                        small
                                                        onClick={actions.remove(index)}
                                                    >
                                                        -
                                                    </ButtonSecondary>
                                                    &nbsp;
                                                </>
                                            )}

                                            <ButtonSecondary small onClick={actions.add(index)}>
                                                +
                                            </ButtonSecondary>
                                        </Cell>
                                    </Grid>
                                    <Grid>
                                        <Cell span={12}>
                                            <Bind
                                                validators={validation.create("required")}
                                                name={`variables.cards.${index}.title`}
                                            >
                                                <Input label={"Card Title"} />
                                            </Bind>
                                        </Cell>
                                    </Grid>
                                    <Grid>
                                        <Cell span={12}>
                                            <Bind
                                                validators={validation.create("required")}
                                                name={`variables.cards.${index}.image`}
                                            >
                                                <SingleImageUpload label="Card Image" />
                                            </Bind>
                                        </Cell>
                                    </Grid>
                                </>
                            ))}
                        </>
                    )}
                </DynamicFieldset>
            </Bind>
            <Grid>
                <Cell span={12}>
                    <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
                </Cell>
            </Grid>
        </Styles>
    );
};

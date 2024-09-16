import React from "react";
import styled from "@emotion/styled";
import { Bind, Form } from "@webiny/form";
import { Grid, Cell } from "@webiny/ui/Grid";
import { ButtonDefault, ButtonIcon, ButtonPrimary } from "@webiny/ui/Button";
import { CircularProgress } from "@webiny/ui/Progress";
import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import { validation } from "@webiny/validation";
import { Input } from "@webiny/ui/Input";
import { Select } from "@webiny/ui/Select";
import { Switch } from "@webiny/ui/Switch";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";
import { useLanguageForm } from "./useLanguageForm";
import { useLanguageNavigate } from "./useLanguageNavigate";

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const LanguageForm = () => {
    const { loading, onSubmit, language, showEmptyView, newEntry } = useLanguageForm();
    const { navigateToCreateLanguage, navigateToLanguageList } = useLanguageNavigate();

    if (showEmptyView) {
        return (
            <EmptyView
                title={`Click on the left side list to display language details or create a...`}
                action={
                    <ButtonDefault onClick={navigateToCreateLanguage}>
                        <ButtonIcon icon={<AddIcon />} /> New Language
                    </ButtonDefault>
                }
            />
        );
    }

    return (
        <Form data={language} onSubmit={onSubmit}>
            {({ data, submit }) => (
                <SimpleForm>
                    {loading && <CircularProgress />}
                    <SimpleFormHeader title={data.name || "New language"} />
                    <SimpleFormContent>
                        <Grid>
                            <Cell span={12}>
                                <Bind name="name" validators={validation.create("required")}>
                                    <Input label={"Name"} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name="code" validators={validation.create("required")}>
                                    <Input
                                        label={"Code"}
                                        disabled={!newEntry}
                                        description={"Cannot be changed after saving!"}
                                    />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind
                                    name="direction"
                                    validators={validation.create("required")}
                                    defaultValue={"ltr"}
                                >
                                    <Select label={"Direction"}>
                                        <option value={"ltr"}>LTR</option>
                                        <option value={"rtl"}>RTL</option>
                                    </Select>
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name="isBaseLanguage">
                                    <Switch label={"Is base language?"} />
                                </Bind>
                            </Cell>
                        </Grid>
                    </SimpleFormContent>
                    <SimpleFormFooter>
                        <ButtonWrapper>
                            <ButtonDefault onClick={navigateToLanguageList}>Cancel</ButtonDefault>
                            <ButtonPrimary onClick={submit}>Save Language</ButtonPrimary>
                        </ButtonWrapper>
                    </SimpleFormFooter>
                </SimpleForm>
            )}
        </Form>
    );
};

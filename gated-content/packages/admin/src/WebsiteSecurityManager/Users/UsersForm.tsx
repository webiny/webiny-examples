import React, { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useRouter } from "@webiny/react-router";
import { Form } from "@webiny/form";
import { Grid, Cell } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { ButtonDefault, ButtonPrimary } from "@webiny/ui/Button";
import { CircularProgress } from "@webiny/ui/Progress";
import { validation } from "@webiny/validation";
import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { LIST_USERS, READ_USER, UPDATE_USER } from "./graphql";
import { WebsiteGroupSelect } from "../WebsiteGroupSelect";
import { User } from "./types";

export const UsersForm: React.FC = () => {
    const { location, history } = useRouter();
    const { showSnackbar } = useSnackbar();

    const search = new URLSearchParams(location.search);
    const id = search.get("id");

    const cancelEdit = useCallback(() => history.push("/website/users"), []);

    const getQuery = useQuery(READ_USER, {
        variables: { id },
        skip: !id,
        onCompleted: data => {
            if (!data) {
                return;
            }

            const { error } = data.security.getWebsiteUser;
            if (error) {
                history.push("/website/users");
                showSnackbar(error.message);
            }
        }
    });

    const [update, updateMutation] = useMutation(UPDATE_USER, {
        refetchQueries: [{ query: LIST_USERS }]
    });

    const loading = [getQuery, updateMutation].find(item => item.loading);

    const updateUser = useCallback(async ({ id, group }) => {
        const response = await update({
            variables: {
                id,
                data: { group }
            }
        });

        const { error } = response.data.security.updateWebsiteUser;
        if (error) {
            return showSnackbar(error.message);
        }

        showSnackbar(`User updated successfully!`);
    }, []);

    const onSubmit = useCallback(async data => {
        updateUser(data);
    }, []);

    const data = getQuery.loading ? null : getQuery?.data?.security?.getWebsiteUser?.data;

    if (!loading && !data) {
        return (
            <EmptyView
                title={`Click on the left side list to display user's details.`}
                action={null}
            />
        );
    }

    const getDisplayName = (data: User | null) => {
        return [data?.firstName, data?.lastName].filter(Boolean).join(" ");
    };

    return (
        <Form data={data} onSubmit={onSubmit}>
            {({ data, form, Bind }) => {
                return (
                    <SimpleForm>
                        {loading && <CircularProgress />}
                        <SimpleFormHeader title={getDisplayName(data)} />
                        <SimpleFormContent>
                            <Grid>
                                <Cell span={12}>
                                    <Bind name="firstName">
                                        <Input label={`First Name`} disabled />
                                    </Bind>
                                </Cell>
                                <Cell span={12}>
                                    <Bind name="lastName">
                                        <Input label={`Last Name`} disabled />
                                    </Bind>
                                </Cell>
                                <Cell span={12}>
                                    <Bind name="email">
                                        <Input label={`Email`} disabled />
                                    </Bind>
                                </Cell>
                                <Cell span={12}>
                                    <Bind name="createdOn">
                                        <Input label={`Signup Date`} disabled />
                                    </Bind>
                                </Cell>
                                <Cell span={12}>
                                    <Bind name="group" validators={validation.create("required")}>
                                        <WebsiteGroupSelect label={"Group"} />
                                    </Bind>
                                </Cell>
                            </Grid>
                        </SimpleFormContent>
                        <SimpleFormFooter>
                            <ButtonDefault onClick={cancelEdit}>{`Cancel`}</ButtonDefault>
                            <ButtonPrimary onClick={form.submit}>{`Save User`}</ButtonPrimary>
                        </SimpleFormFooter>
                    </SimpleForm>
                );
            }}
        </Form>
    );
};

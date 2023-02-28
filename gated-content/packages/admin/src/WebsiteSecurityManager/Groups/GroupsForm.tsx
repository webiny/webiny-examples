import React, { useCallback, useMemo } from "react";
import slugify from "slugify";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ReactComponent as AddIcon } from "@material-design-icons/svg/filled/add.svg";
import { plugins } from "@webiny/plugins";
import { useRouter } from "@webiny/react-router";
import { Form, BindComponentProps } from "@webiny/form";
import { Grid, Cell } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { ButtonDefault, ButtonIcon, ButtonPrimary } from "@webiny/ui/Button";
import { CircularProgress } from "@webiny/ui/Progress";
import { validation } from "@webiny/validation";
import {
    SimpleForm,
    SimpleFormFooter,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";
import { Typography } from "@webiny/ui/Typography";
import { Permissions } from "@webiny/app-admin/components/Permissions";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import {
    CREATE_GROUP,
    LIST_GROUPS,
    LIST_LIMITED_GROUPS,
    READ_GROUP,
    UPDATE_GROUP
} from "./graphql";
import { WebsitePermissionRendererPlugin } from "../ContentModule";

const refetchQueries = [{ query: LIST_GROUPS }, { query: LIST_LIMITED_GROUPS }];

export const GroupsForm: React.FC = () => {
    const { location, history } = useRouter();
    const { showSnackbar } = useSnackbar();

    const search = new URLSearchParams(location.search);
    const newGroup = search.get("new") === "true";
    const id = search.get("id");

    const websitePermissionPlugins = useMemo(() => {
        return plugins.byType<WebsitePermissionRendererPlugin>(
            WebsitePermissionRendererPlugin.type
        );
    }, []);

    const cancelEdit = useCallback(() => history.push("/website/groups"), []);

    const getQuery = useQuery(READ_GROUP, {
        variables: { id },
        skip: !id,
        onCompleted: data => {
            if (!data) {
                return;
            }

            const { error } = data.security.group;
            if (error) {
                history.push("/website/groups");
                showSnackbar(error.message);
            }
        }
    });

    const [create, createMutation] = useMutation(CREATE_GROUP, {
        refetchQueries
    });

    const [update, updateMutation] = useMutation(UPDATE_GROUP, {
        refetchQueries
    });

    const loading = [getQuery, createMutation, updateMutation].find(item => item.loading);

    const createGroup = useCallback(async data => {
        const response = await create({
            variables: { data }
        });

        const { data: group, error } = response.data.security.createWebsiteGroup;
        if (error) {
            return showSnackbar(error.message);
        }

        history.push(`/website/groups?id=${group.id}`);
        showSnackbar(`Group created successfully!`);
    }, []);

    const updateGroup = useCallback(async ({ id, name, description, permissions }) => {
        const response = await update({
            variables: {
                id,
                data: { name, description, permissions }
            }
        });

        const { error } = response.data.security.updateWebsiteGroup;
        if (error) {
            return showSnackbar(error.message);
        }

        showSnackbar(`Group updated successfully!`);
    }, []);

    const onSubmit = useCallback(async data => {
        if (!data.permissions) {
            data.permissions = [];
        }

        data.id ? updateGroup(data) : createGroup(data);
    }, []);

    const data = getQuery.loading ? null : getQuery?.data?.security?.group?.data;

    if (!newGroup && !loading && !data) {
        return (
            <EmptyView
                title={`Click on the left side list to display group details or create a...`}
                action={
                    <ButtonDefault onClick={() => history.push("/website/groups?new=true")}>
                        <ButtonIcon icon={<AddIcon />} />
                        {`New Group`}
                    </ButtonDefault>
                }
            />
        );
    }

    const afterNameChange: BindComponentProps["afterChange"] = (value, form) => {
        // We want to update slug only when the group is first being created.
        if (!id) {
            form.setValue(
                "slug",
                slugify(value, {
                    replacement: "-",
                    lower: true,
                    remove: /[*#\?<>_\{\}\[\]+~.()'"!:;@]/g,
                    trim: false
                })
            );
        }
    };

    return (
        <Form data={data} onSubmit={onSubmit}>
            {({ data, form, Bind }) => {
                return (
                    <SimpleForm>
                        {loading && <CircularProgress />}
                        <SimpleFormHeader title={data?.name || "Untitled"} />
                        <SimpleFormContent>
                            <Grid>
                                <Cell span={6}>
                                    <Bind
                                        name="name"
                                        afterChange={afterNameChange}
                                        validators={validation.create("required,minLength:3")}
                                    >
                                        <Input label={`Name`} />
                                    </Bind>
                                </Cell>
                                <Cell span={6}>
                                    <Bind
                                        name="slug"
                                        validators={validation.create("required,minLength:3")}
                                    >
                                        <Input disabled={Boolean(data?.id)} label={`Slug`} />
                                    </Bind>
                                </Cell>
                            </Grid>
                            <Grid>
                                <Cell span={12}>
                                    <Bind
                                        name="description"
                                        validators={validation.create("maxLength:500")}
                                    >
                                        <Input label={`Description`} rows={3} />
                                    </Bind>
                                </Cell>
                            </Grid>

                            <Grid>
                                <Cell span={12}>
                                    <Typography use={"subtitle1"}>{`Permissions`}</Typography>
                                </Cell>
                                <Cell span={12}>
                                    <Bind name={"permissions"} defaultValue={[]}>
                                        {bind => (
                                            <Permissions
                                                plugins={websitePermissionPlugins}
                                                id={data?.id || "new"}
                                                {...bind}
                                            />
                                        )}
                                    </Bind>
                                </Cell>
                            </Grid>
                        </SimpleFormContent>
                        <SimpleFormFooter>
                            <ButtonDefault onClick={cancelEdit}>{`Cancel`}</ButtonDefault>
                            <ButtonPrimary onClick={form.submit}>{`Save group`}</ButtonPrimary>
                        </SimpleFormFooter>
                    </SimpleForm>
                );
            }}
        </Form>
    );
};

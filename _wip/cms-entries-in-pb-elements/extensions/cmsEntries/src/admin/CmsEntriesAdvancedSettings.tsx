import React, { useMemo } from "react";
import { Bind, useForm } from "@webiny/form";
import { ButtonPrimary } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Select } from "@webiny/ui/Select";
import { useModels } from "@webiny/app-headless-cms";
import { useQuery } from "@apollo/react-hooks";
import { LIST_PAGE_ELEMENTS } from "@webiny/app-page-builder/admin/graphql/pages";

interface ListPageElementsQueryResponse {
    pageBuilder: {
        listPageElements: {
            data: {
                id: string;
                name: string;
            }[];
        };
    }
}

export const CmsEntriesAdvancedSettings = () => {
    // In order to construct the settings form, we're using the
    // `@webiny/form`, `@webiny/ui`, and `@webiny/validation` packages.
    const { submit } = useForm();

    const { models } = useModels();
    const modelsOptions = useMemo(() => {
        return models.map(item => {
            return { value: item.modelId, label: item.name };
        });
    }, [models]);

    const pageElementsQuery = useQuery<ListPageElementsQueryResponse>(LIST_PAGE_ELEMENTS);
    const pageElementsOptions = useMemo(() => {
        if (!pageElementsQuery.data) {
            return [];
        }

        return pageElementsQuery.data.pageBuilder.listPageElements.data?.map(item => {
            return { value: item.id, label: item.name };
        });
    }, [pageElementsQuery.data]);

    return (
        <Grid>
            <Cell span={12}>
                <Bind name={"cmsModelId"}>
                    <Select
                        label={"Type"}
                        description={"Choose model to list."}
                        options={modelsOptions}
                    />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={"pbElementId"}>
                    <Select
                        label={"Page Element "}
                        description={"Chose page element to use."}
                        options={pageElementsOptions}
                    />
                </Bind>
            </Cell>

            <Cell span={12}>
                <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
            </Cell>
        </Grid>
    );
};

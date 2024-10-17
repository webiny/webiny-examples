import React from "react";
import { useSecurity } from "@webiny/app-serverless-cms";
import { Grid, Cell } from "@webiny/ui/Grid";
import { Tabs, Tab } from "@webiny/ui/Tabs";
import { Alert } from "@webiny/ui/Alert";

const renderPizzaLayout: CmsContentFormRenderPluginProps["render"] = ({ fields, data }) => {
    const { getPermission } = useSecurity();
    const bakeryPermission = getPermission("bakery");
    const canEditRecipe = bakeryPermission && bakeryPermission.canEditRecipe === true;

    const priceTooLow = data.price < 20 && data.numberOfIngredients > 6;

    return (
        <Tabs>
            <Tab label="General">
                {priceTooLow && (
                    <Grid>
                        <Cell span={12}>
                            <Alert type={"warning"} title={"Please double-check your input"}>
                                The price of <strong>{data.price}</strong> seems too low for a pizza
                                with over <strong>6</strong> ingredients.
                            </Alert>
                        </Cell>
                    </Grid>
                )}
                <Grid>
                    <Cell span={12}>{fields.name}</Cell>
                </Grid>
                <Grid>
                    <Cell span={6}>{fields.price}</Cell>
                    <Cell span={6}>{fields.numberOfIngredients}</Cell>
                </Grid>
            </Tab>
            {canEditRecipe && (
                <Tab label="Recipe">
                    <Grid>
                        <Cell span={12}>{fields.recipe}</Cell>
                    </Grid>
                </Tab>
            )}
            <Tab label="History">
                <Grid>
                    <Cell span={12}>{fields.history}</Cell>
                </Grid>
            </Tab>
        </Tabs>
    );
};

export const Extension = () => {
    return (
        <>
            <CmsContentFormRenderPlugin modelId={"pizza"} render={renderPizzaLayout} />
        </>
    );
};

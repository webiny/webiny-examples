import React, { useEffect } from "react";
import { plugins } from "@webiny/plugins";
import type { CmsContentFormRendererPlugin } from "@webiny/app-headless-cms/types";
import { Alert } from '@webiny/ui/Alert'
import { Grid, Cell } from "@webiny/ui/Grid";
import { Tabs, Tab } from "@webiny/ui/Tabs";

interface LayoutProps {
    fields: Record<string, JSX.Element>;
    data: Record<string, any>
}

const PizzaLayout = ({ fields, data }: LayoutProps) => {
    const priceTooLow = data['price'] < 20 && data['numberOfIngredients'] > 6
  
    return (
      <Tabs>

        <Tab label="General">
          {priceTooLow && (
            <Grid>
            <Cell span={12}>
                <Alert type={'warning'} title={'Please double-check your input'}>
                The price of <strong>{data['price']}</strong> seems too low for a pizza with over{' '}
                <strong>6</strong> ingredients.
                </Alert>
            </Cell>
            </Grid>
          )}
          <Grid>
            <Cell span={12}>{fields['name']}</Cell>
          </Grid>
          <Grid>
            <Cell span={6}>{fields['price']}</Cell>
            <Cell span={6}>{fields['numberOfIngredients']}</Cell>
          </Grid>
        </Tab>
        
        <Tab label="Recipe">
        <Grid>
            <Cell span={12}>{fields['recipe']}</Cell>
        </Grid>
        </Tab>
        
        <Tab label="History">
          <Grid>
            <Cell span={12}>{fields['history']}</Cell>
          </Grid>
        </Tab>
      </Tabs>
    );
  };

export const Extension = () => {
  useEffect(() => {
    const layoutPlugin: CmsContentFormRendererPlugin = {
      type: "cms-content-form-renderer",
      modelId: "pizza",
      render(props) {
        return <PizzaLayout {...props} />;
      },
    };

    plugins.register(layoutPlugin);
  }, []);

  return null;
};

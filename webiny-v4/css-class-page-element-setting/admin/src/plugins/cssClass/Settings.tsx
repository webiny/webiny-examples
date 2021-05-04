import React from "react";
import { get } from "lodash";
import { set } from "dot-prop-immutable";
import { connect } from "@webiny/app-page-builder/editor/redux";
import { useHandler } from "@webiny/app/hooks/useHandler";
import { Tabs, Tab } from "@webiny/ui/Tabs";
import { Input } from "@webiny/ui/Input";
import { InputContainer } from "@webiny/app-page-builder/editor/plugins/elementSettings/components/StyledComponents";
import { Typography } from "@webiny/ui/Typography";
import { Grid, Cell } from "@webiny/ui/Grid";
import { Form } from "@webiny/form";
import { updateElement } from "@webiny/app-page-builder/editor/actions";
import { getActiveElement } from "@webiny/app-page-builder/editor/selectors";

// Remove code for brevity.
const validateClassName = () => {
  // TODO: add validation for valid "className"
  // https://pineco.de/css-quick-tip-the-valid-characters-in-a-custom-css-selector/
  return true;
};

const Settings = props => {
    // Implement onChange handler with the help of `useHandler` hook.
    const updateSettings = useHandler(props, ({ element, updateElement }) => async (data, form) => {
        // validate form
        const valid = await form.validate();
        // Don't save value if form is invalid.
        if (!valid) {
            return;
        }

        const attrKey = `data.settings.className`;
        // Set new value for `className`.
        const newElement = set(element, attrKey, data.className);
        // Update the element using `updateElement` action creator
        updateElement({ element: newElement });
    });
    // Extract data from active element passed to component using props.
    const { data } = props.element;
    const settings = get(data, "settings", { className: "" });
    // In case of no value, add empty string as default value
    if (typeof settings.className !== "string") {
        settings.className = "";
    }

    return (
        <Form data={settings} onChange={updateSettings}>
            {({ Bind }) => (
                <Tabs>
                    <Tab label={"CSS class"}>
                        <Grid>
                            <Cell span={5}>
                                {/* Label for input */}
                                <Typography use={"overline"}>CSS class</Typography>
                            </Cell>
                            <Cell span={7}>
                                <InputContainer width={"auto"} margin={0}>
                                    {/* The actual input component */}
                                    <Bind name={"className"} validators={validateClassName}>
                                        <Input />
                                    </Bind>
                                </InputContainer>
                            </Cell>
                        </Grid>
                    </Tab>
                </Tabs>
            )}
        </Form>
    );
};

const mapStateToProps = state => ({ element: getActiveElement(state) });
const mapDispatchToProps = { updateElement };

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Settings);
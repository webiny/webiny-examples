import React, { useCallback, useEffect, useRef } from "react";
import { Input } from "@webiny/ui/Input";
import { Cell, Grid } from "@webiny/ui/Grid";
import camelCase from "lodash/camelCase";
import { validation } from "@webiny/validation";
import { Validator } from "@webiny/validation/types";
import { Bind, useForm } from "@webiny/form";
import { plugins } from "@webiny/plugins";
import { type Plugin } from "@webiny/plugins/types";
import { PbEditorFunnelFieldSettingsPluginProps } from "../plugins/PbEditorFunnelFieldSettingsPlugin";
import { FunnelFieldDefinitionModel } from "../../../shared/models/FunnelFieldDefinitionModel";
import { useContainer } from "../../pageElements/container/ContainerProvider";

interface GeneralTabProps {
    field: FunnelFieldDefinitionModel;
    open: boolean;
}

export const GeneralTab = ({ open }: GeneralTabProps) => {
    const { setValue, data: field } = useForm();

    const { funnelVm } = useContainer();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const afterChangeLabel = useCallback((value: string): void => {
        setValue("fieldId", camelCase(value));
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (!inputRef.current) {
                return;
            }

            // On dialog open, we focus the first input field.
            if (open) {
                inputRef.current.focus();
            }
        }, 150);
    }, [open]);

    const uniqueFieldIdValidator: Validator = useCallback(() => {
        const existingField = funnelVm.getFieldByFieldId(field.fieldId);
        if (!existingField) {
            return true;
        }

        if (existingField.id === field.id) {
            return true;
        }
        throw new Error("A field with this field ID already exists.");
    }, [field.fieldId]);

    const fieldIdValidator: Validator = useCallback((fieldId: string) => {
        if (!fieldId) {
            return true;
        }

        if (/^[a-zA-Z0-9_-]*$/.test(fieldId)) {
            return true;
        }
        throw Error('Field ID may contain only letters, numbers and "-" and "_" characters.');
    }, []);

    const fieldSettingsPlugin = plugins.byType("pb-editor-funnel-field-settings").find(plugin => {
        return plugin.fieldType === field.type;
    }) as Plugin<PbEditorFunnelFieldSettingsPluginProps>;

    let additionalSettings: React.ReactNode = null;
    if (fieldSettingsPlugin) {
        const RendererComponent = fieldSettingsPlugin.renderer;
        additionalSettings = (
            <RendererComponent
                afterChangeLabel={afterChangeLabel}
                uniqueFieldIdValidator={uniqueFieldIdValidator}
            />
        );
    }

    return (
        <>
            <Grid>
                <Cell span={6}>
                    <Bind
                        name={"label"}
                        validators={validation.create("required")}
                        afterChange={afterChangeLabel}
                    >
                        <Input label={"Label"} inputRef={inputRef} />
                    </Bind>
                </Cell>
                <Cell span={6}>
                    <Bind
                        name={"fieldId"}
                        validators={[
                            validation.create("required"),
                            uniqueFieldIdValidator,
                            fieldIdValidator
                        ]}
                    >
                        <Input label={"Field ID"} />
                    </Bind>
                </Cell>
                <Cell span={12}>
                    <Bind name={"helpText"}>
                        <Input label={"Help text"} description={"Help text (optional)"} />
                    </Bind>
                </Cell>
            </Grid>
            {additionalSettings}
        </>
    );
};

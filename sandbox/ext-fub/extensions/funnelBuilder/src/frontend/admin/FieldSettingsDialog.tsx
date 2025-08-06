import React, { useMemo } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@webiny/ui/Dialog";
import { Form, FormOnSubmit } from "@webiny/form";
import { Tab, Tabs } from "@webiny/ui/Tabs";
import { ButtonDefault, ButtonPrimary } from "@webiny/ui/Button";
import { GeneralTab } from "./FieldSettingsDialog/GeneralTab";
import { ValidatorsTab } from "./FieldSettingsDialog/ValidatorsTab";
import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../../shared/models/FunnelFieldDefinitionModel";
import { ClassNames } from "@emotion/react";

interface EditFieldDialogProps {
    field: FunnelFieldDefinitionModel;
    onClose: () => void;
    open: boolean;
    onSubmit: FormOnSubmit<FunnelFieldDefinitionModelDto>;
}

const dialogContentCss = {
    width: 875,
    minHeight: 400,
    maxHeight: 600
};

export const FieldSettingsDialog = ({ field, open, onClose, onSubmit }: EditFieldDialogProps) => {
    const initialFormData = useMemo(() => {
        if (!field) {
            return {};
        }
        return field.toDto();
    }, [field]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Field Settings</DialogTitle>
            {field && (
                <Form<FunnelFieldDefinitionModelDto> data={initialFormData} onSubmit={onSubmit}>
                    {({ submit }) => (
                        <>
                            <ClassNames>
                                {({ css }) => (
                                    <DialogContent className={css(dialogContentCss)}>
                                        <Tabs>
                                            <Tab label={"General"}>
                                                <GeneralTab field={field} open={open} />
                                            </Tab>
                                            {field && field.supportedValidatorTypes.length > 0 && (
                                                <Tab label={"Validators"}>
                                                    <ValidatorsTab field={field} />
                                                </Tab>
                                            )}
                                        </Tabs>
                                    </DialogContent>
                                )}
                            </ClassNames>
                            <DialogActions style={{ justifyContent: "flex-end" }}>
                                <ButtonDefault onClick={onClose}>Cancel</ButtonDefault>
                                <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
                            </DialogActions>
                        </>
                    )}
                </Form>
            )}
        </Dialog>
    );
};

import React from "react";
import { Form, FormOnSubmit } from "@webiny/form";
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from "@webiny/ui/Dialog";
import { ClassNames } from "@emotion/react";
import { FunnelModelDto } from "../../shared/models/FunnelModel";
import { ConditionRulesForm } from "./ConditionRulesDialog/ConditionRulesForm";

const dialogContentCss = {
    width: 875,
    minHeight: 600,
    maxHeight: "800px !important",
    height: "auto"
};

interface ConditionRulesDialogProps {
    open: boolean;
    data: FunnelModelDto;
    onClose: () => void;
    onSubmit: FormOnSubmit<FunnelModelDto>;
}

export const ConditionRulesDialog = ({
    data,
    open,
    onClose,
    onSubmit
}: ConditionRulesDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Conditional Rules</DialogTitle>
            {data && (
                <Form<FunnelModelDto> data={data} onSubmit={onSubmit}>
                    {({ submit }) => (
                        <>
                            <ClassNames>
                                {({ css }) => (
                                    <DialogContent className={css(dialogContentCss)}>
                                        <ConditionRulesForm />
                                    </DialogContent>
                                )}
                            </ClassNames>
                            <DialogActions style={{ justifyContent: "flex-end" }}>
                                <div>
                                    <DialogButton onClick={onClose}>{"Cancel"}</DialogButton>
                                    <DialogButton onClick={submit}>{"Save"}</DialogButton>
                                </div>
                            </DialogActions>
                        </>
                    )}
                </Form>
            )}
        </Dialog>
    );
};

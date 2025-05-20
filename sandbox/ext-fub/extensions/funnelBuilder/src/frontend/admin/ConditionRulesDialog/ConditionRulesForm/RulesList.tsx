import React from "react";
import { Accordion, AccordionProps } from "@webiny/ui/Accordion";
import { useConditionRulesForm } from "../useConditionRulesForm";
import styled from "@emotion/styled";
import { ReactComponent as BasePlusIcon } from "@material-design-icons/svg/outlined/add.svg";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { ButtonDefault, ButtonIcon } from "@webiny/ui/Button";

const PlusIcon = styled(BasePlusIcon)`
    fill: white;
    width: 16px;
    height: 16px;
    margin-right: 2px;
`;

export interface ConditionRulesFormProps {
    children: AccordionProps["children"];
}

export const RulesList = ({ children }: ConditionRulesFormProps) => {
    const { rules, addRule } = useConditionRulesForm();

    return (
        <>
            {rules.length > 0 && <Accordion elevation={0}>{children}</Accordion>}

            {rules.length === 0 ? (
                <div style={{ marginTop: 100 }}>
                    <EmptyView
                        title={"No rules added yet. Click the Add Rule button below to add one."}
                        action={
                            <ButtonDefault onClick={addRule}>
                                <ButtonIcon icon={<PlusIcon />} /> Add rule
                            </ButtonDefault>
                        }
                    />
                </div>
            ) : (
                <div style={{ display: "flex", justifyContent: "center", gap: 10, paddingTop: 16 }}>
                    <ButtonDefault onClick={addRule}>
                        <ButtonIcon icon={<PlusIcon />} /> Add rule
                    </ButtonDefault>
                </div>
            )}
        </>
    );
};

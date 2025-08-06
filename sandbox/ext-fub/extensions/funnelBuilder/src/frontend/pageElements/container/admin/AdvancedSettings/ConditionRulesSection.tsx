import React from "react";
import styled from "@emotion/styled";
import { ButtonSecondary } from "@webiny/ui/Button";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import {
    useActiveElementId,
    useElementById,
    useElementWithChildren,
    useUpdateElement
} from "@webiny/app-page-builder/editor";
import { ContainerElementWithChildren } from "../../types";
import { FunnelModelDto } from "../../../../../shared/models/FunnelModel";
import { useDisclosure } from "../../../../admin/useDisclosure";
import { ConditionRulesDialog } from "../../../../admin/ConditionRulesDialog";

const EditConditionRulesButton = styled(ButtonSecondary)`
    display: block;
    margin: 4px auto;
`;

export const ConditionRulesSection = () => {
    const [activeElementId] = useActiveElementId();
    const containerElementWithChildren = useElementWithChildren(
        activeElementId!
    ) as ContainerElementWithChildren;

    const {
        open: showConditionRulesDialog,
        close: hideConditionRulesDialog,
        isOpen: isConditionRulesDialogShown,
        data: conditionRulesDialogData
    } = useDisclosure<FunnelModelDto>();

    const conditionalRulesCount = containerElementWithChildren.data.conditionRules.length;

    const [editorElement] = useElementById(activeElementId);
    const updateElement = useUpdateElement();

    return (
        <Accordion title={"Conditional Rules"} defaultValue={true}>
            <>
                <EditConditionRulesButton
                    onClick={() => {
                        const conditionRulesClone = structuredClone(
                            containerElementWithChildren.data
                        );
                        showConditionRulesDialog(conditionRulesClone);
                    }}
                >
                    Conditional Rules&nbsp;
                    {conditionalRulesCount > 0 && <>({conditionalRulesCount})</>}
                </EditConditionRulesButton>

                <ConditionRulesDialog
                    open={isConditionRulesDialogShown}
                    data={conditionRulesDialogData!}
                    onClose={hideConditionRulesDialog}
                    onSubmit={data => {
                        updateElement({ ...editorElement!, data }, { history: true });
                        hideConditionRulesDialog();
                    }}
                />
            </>
        </Accordion>
    );
};

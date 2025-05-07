import React from "react";
import styled from "@emotion/styled";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "../Icon";
import { Input } from "@webiny/ui/Input";
import { Bind, Form } from "@webiny/form";
import { validation } from "@webiny/validation";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import { useDisclosure } from "../../../../../admin/useDisclosure";

// Icons.
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as DragIndicatorIcon } from "@material-design-icons/svg/outlined/drag_indicator.svg";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import { useStepsForm } from "../useStepsForm";
import { FunnelStepModelDto } from "../../../../../../shared/models/FunnelStepModel";

const ListItemStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--mdc-theme-background);
`;

const PageTitleContainer = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;

    svg {
        height: 20px;
    }
`;

const IconsContainer = styled.div`
    display: flex;
    gap: 4px;
`;

const StyledDragIcon = styled(DragIndicatorIcon)`
    cursor: grab;
`;

interface StepsListItemProps {
    step: FunnelStepModelDto;
}

export const StepsListItem = ({ step }: StepsListItemProps) => {
    const {
        open: showTitleInput,
        close: hideEditTitleInput,
        isOpen: isTitleInputShown
    } = useDisclosure();

    const { showConfirmation } = useConfirmationDialog({
        title: "Remove step",
        message: <p>Are you sure you want to remove this step?</p>
    });

    const { updateStep, deleteStep, canDeleteSteps } = useStepsForm();

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: step.id
    });

    const submitTitleForm = (data: { title: string }) => {
        updateStep({
            ...step,
            title: data.title
        });
        hideEditTitleInput();
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <ListItemStyled ref={setNodeRef} style={style}>
            <PageTitleContainer>
                {isTitleInputShown ? (
                    <Form<{ title: string }>
                        data={{ title: step.title }}
                        onSubmit={submitTitleForm}
                    >
                        {({ submit }) => (
                            <Bind name={"title"} validators={validation.create("required")}>
                                <Input
                                    size={"small"}
                                    onBlur={hideEditTitleInput}
                                    autoFocus
                                    onKeyDown={e => {
                                        // @ts-expect-error
                                        if (e.key === "Enter") {
                                            submit();
                                        }

                                        // On Escape, cancel changes and hide the input.
                                        // @ts-expect-error
                                        if (e.key === "Escape") {
                                            hideEditTitleInput();
                                        }
                                    }}
                                />
                            </Bind>
                        )}
                    </Form>
                ) : (
                    <>
                        {step.title}
                        <Icon size={20} element={<EditIcon />} onClick={() => showTitleInput()} />
                    </>
                )}
            </PageTitleContainer>

            <IconsContainer>
                <Icon element={<StyledDragIcon />} {...attributes} {...listeners} />
                <Icon
                    disabled={!canDeleteSteps}
                    element={<DeleteIcon />}
                    onClick={() => {
                        showConfirmation(async () => deleteStep(step.id));
                    }}
                />
            </IconsContainer>
        </ListItemStyled>
    );
};

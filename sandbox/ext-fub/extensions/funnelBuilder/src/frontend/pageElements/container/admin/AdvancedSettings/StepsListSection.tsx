import React from "react";
import styled from "@emotion/styled";
import { ButtonIcon, ButtonSecondary } from "@webiny/ui/Button";
import { StepsListItem } from "./StepsListSection/StepsListItem";

// Sorting.
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";

// Icons.
import { ReactComponent as AddIcon } from "@material-design-icons/svg/outlined/add.svg";
import { useStepsForm } from "./useStepsForm";
import { isSuccessStepElementType } from "../../../../../shared/constants";

const StyledAccordion = styled(Accordion)`
    overflow: hidden;

    .accordion-content {
        padding: 0;
    }
`;

const AddPageButton = styled(ButtonSecondary)`
    display: block;
    margin: 20px auto;
`;

export const StepsListSection = () => {
    const { containerElementWithChildren, createStep, moveStep } = useStepsForm();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    return (
        <StyledAccordion title={"Pages"} defaultValue={true}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={event => {
                    const { active, over } = event;
                    if (active.id === over?.id) {
                        return;
                    }

                    const { steps } = containerElementWithChildren.data;
                    const fromIndex = steps.findIndex(step => step.id === active.id);
                    const toIndex = steps.findIndex(step => step.id === over?.id);

                    moveStep(fromIndex, toIndex);
                }}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={containerElementWithChildren.data.steps}
                    strategy={verticalListSortingStrategy}
                >
                    {containerElementWithChildren.data.steps
                        .filter(step => !isSuccessStepElementType(step.id))
                        .map(step => (
                            <StepsListItem step={step} key={step.id} />
                        ))}
                    <AddPageButton onClick={createStep}>
                        <ButtonIcon icon={<AddIcon />} /> Add page
                    </AddPageButton>
                </SortableContext>
            </DndContext>
        </StyledAccordion>
    );
};

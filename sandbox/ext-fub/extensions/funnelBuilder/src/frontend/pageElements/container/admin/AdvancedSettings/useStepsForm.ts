import {
    useActiveElementId,
    useElementWithChildren,
    useUpdateElement
} from "@webiny/app-page-builder/editor";
import { useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { ContainerElementWithChildren } from "../../types";
import { getRandomId } from "../../../../../shared/getRandomId";
import { createStepElement } from "../../../../../shared/createStepElement";
import { useSnackbar } from "@webiny/app-admin";
import { FunnelStepModelDto } from "../../../../../shared/models/FunnelStepModel";
import { getContainerStore } from "../../ContainerProvider";

export const useStepsForm = () => {
    const [activeElementId] = useActiveElementId();
    const containerElementWithChildren = useElementWithChildren(
        activeElementId!
    ) as ContainerElementWithChildren;

    const updateElement = useUpdateElement();
    const { showSnackbar } = useSnackbar();

    const canDeleteSteps = containerElementWithChildren.data.steps.length > 2;

    const deleteStep = useCallback(
        (stepId: string) => {
            const { funnelVm } = getContainerStore();
            const hasFields = funnelVm.getFields().some(f => {
                return f.stepId === stepId;
            });

            if (hasFields) {
                // We can't delete a step that has fields. We need to remove the fields first.
                showSnackbar("Please remove all fields from this step before deleting it.");
                return;
            }

            updateElement(
                {
                    ...containerElementWithChildren,
                    data: {
                        ...containerElementWithChildren.data,
                        steps: containerElementWithChildren.data.steps.filter(
                            step => step.id !== stepId
                        )
                    },
                    elements: containerElementWithChildren.elements.filter(
                        element => element.data.stepId !== stepId
                    )
                },
                { history: true }
            );

            setTimeout(() => {
                funnelVm.activateFirstAvailableStep();
            }, 100);
            showSnackbar("Step deleted successfully.");
        },
        [containerElementWithChildren, updateElement]
    );

    const updateStep = useCallback(
        (step: FunnelStepModelDto) => {
            updateElement(
                {
                    ...containerElementWithChildren,
                    data: {
                        ...containerElementWithChildren.data,
                        steps: [
                            ...containerElementWithChildren.data.steps.map(existingStep => {
                                if (existingStep.id === step.id) {
                                    return step;
                                }
                                return existingStep;
                            })
                        ]
                    }
                },
                { history: true }
            );
        },
        [containerElementWithChildren, updateElement]
    );

    const createStep = useCallback(() => {
        const initialStepData = {
            id: getRandomId(),
            title: "New Page"
        };

        // We insert the step before the last one. We always keep the last step as
        // the last one because that's the success page step.
        const lastStepIndex = containerElementWithChildren.data.steps.length - 1;

        updateElement(
            {
                ...containerElementWithChildren,
                data: {
                    ...containerElementWithChildren.data,
                    steps: [
                        ...containerElementWithChildren.data.steps.slice(0, lastStepIndex),
                        initialStepData,
                        ...containerElementWithChildren.data.steps.slice(lastStepIndex)
                    ]
                },

                // @ts-ignore Incompatible types. Ignoring for now.
                elements: [
                    ...containerElementWithChildren.elements.slice(0, lastStepIndex),
                    createStepElement(initialStepData.id),
                    ...containerElementWithChildren.elements.slice(lastStepIndex)
                ]
            },
            { history: true }
        );

        setTimeout(() => {
            // We do this within a timeout, just so we're safe we're dealing with the latest data.
            const { funnelVm } = getContainerStore();
            funnelVm.activateStep(initialStepData.id);
        }, 100);
    }, [containerElementWithChildren, updateElement]);

    const moveStep = useCallback(
        (oldIndex: number, newIndex: number) => {
            updateElement(
                {
                    ...containerElementWithChildren,
                    data: {
                        ...containerElementWithChildren.data,
                        steps: arrayMove(
                            containerElementWithChildren.data.steps,
                            oldIndex,
                            newIndex
                        )
                    },
                    elements: arrayMove(containerElementWithChildren.elements, oldIndex, newIndex)
                },
                { history: false }
            );
        },
        [containerElementWithChildren, updateElement]
    );

    return {
        containerElementWithChildren,
        canDeleteSteps,
        updateStep,
        deleteStep,
        createStep,
        moveStep
    };
};

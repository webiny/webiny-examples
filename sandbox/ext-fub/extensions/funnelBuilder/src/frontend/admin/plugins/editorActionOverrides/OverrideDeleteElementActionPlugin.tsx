import React from "react";
import { PbEditorOverrideActionHandlerPlugin } from "../PbEditorOverrideEventActionPlugin";
import {
    deleteElementAction,
    DeleteElementActionEvent
} from "@webiny/app-page-builder/editor/recoil/actions";
import type { DeleteElementActionArgsType } from "@webiny/app-page-builder/editor/recoil/actions/deleteElement/types";
import type { EventActionCallable } from "@webiny/app-page-builder/types";
import { Snackbar } from "@webiny/ui/Snackbar";
import { useDisclosure } from "../../useDisclosure";
import { ElementTreeTraverser } from "../../ElementTreeTraverser";
import {
    CONTAINER_ELEMENT_ID,
    isContainerElementType,
    isFieldElementType,
    isStepElementType
} from "../../../../shared/constants";
import { ContainerElement } from "../../../pageElements/container/types";

const DO_NOTHING = { actions: [] };

export const OverrideDeleteElementActionPlugin = () => {
    const {
        open: showSnackbar,
        close: hideSnackbar,
        isOpen: snackbarShown,
        data: snackbarMessage
    } = useDisclosure<string>();

    return (
        <>
            <PbEditorOverrideActionHandlerPlugin
                action={"delete-element"}
                onEditorMount={handler => {
                    const traverser = new ElementTreeTraverser();

                    return handler.on(DeleteElementActionEvent, (async (...params) => {
                        const [state, , args] = params;
                        if (!args) {
                            return DO_NOTHING;
                        }

                        const { element } = args;

                        // 1. Prevent deletion of the funnel container element.
                        if (isContainerElementType(element.type)) {
                            showSnackbar("Cannot delete the funnel container element.");
                            return DO_NOTHING;
                        }

                        // 2. Prevent deletion of steps and step grids (first child of a funnel step).
                        const isStepGrid = element.data.isFunnelStepGrid;
                        if (isStepElementType(element.type) || isStepGrid) {
                            showSnackbar(
                                "A step cannot be deleted directly. To remove a step, select the container element and delete it from the right sidebar."
                            );
                            return DO_NOTHING;
                        }

                        // 3. Prevent deletion of fields in specific cases.
                        if (isFieldElementType(element.type)) {
                            // 2.1 Prevent deleting a field if it's mentioned in conditional rules.
                            const containerElement = (await state.getElementById(
                                CONTAINER_ELEMENT_ID
                            )) as ContainerElement;

                            // Might not be performant, but it works / is good enough.
                            const conditionRulesJsonString = JSON.stringify(
                                containerElement.data.conditionRules
                            );

                            const fieldId = element.data.id;
                            if (conditionRulesJsonString.includes(fieldId)) {
                                showSnackbar(
                                    "Cannot delete this field because it is used in conditional rules."
                                );
                                return DO_NOTHING;
                            }

                            const result = await deleteElementAction(...params);

                            if (result.state?.elements) {
                                result.state.elements = {
                                    ...result.state.elements,

                                    // Update container (remove field from `fields` array).
                                    [containerElement.id]: {
                                        ...containerElement,
                                        data: {
                                            ...containerElement.data,
                                            fields: containerElement.data.fields.filter(
                                                field => field.id !== fieldId
                                            )
                                        }
                                    }
                                };
                            }

                            return result;
                        }

                        // 4. Prevent deleting elements that contain the funnel container or a field.
                        const withDescendants = await state.getElementTree({ element });

                        let preventDeletion = false;
                        let message = "";
                        traverser.traverse(withDescendants, element => {
                            if (isContainerElementType(element.type)) {
                                preventDeletion = true;
                                message =
                                    "Cannot delete this element because it contains the funnel container.";
                                return false;
                            }

                            if (isFieldElementType(element.type)) {
                                preventDeletion = true;
                                message =
                                    "Cannot delete this element because it contains one or more fields. Please remove the fields first.";
                                return false;
                            }

                            return;
                        });

                        if (preventDeletion) {
                            showSnackbar(message);
                            return DO_NOTHING;
                        }

                        return deleteElementAction(...params);
                    }) as EventActionCallable<DeleteElementActionArgsType>);
                }}
            />
            <Snackbar
                message={snackbarMessage}
                open={snackbarShown}
                onClose={hideSnackbar}
                timeout={5000}
            />
        </>
    );
};

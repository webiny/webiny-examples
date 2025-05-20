import React, { useCallback, useEffect } from "react";
import {
    useActiveElementId,
    useElementById,
    useEventActionHandler,
    useUpdateElement
} from "@webiny/app-page-builder/editor";
import {
    CreateElementActionEvent,
    UpdateElementActionEvent
} from "@webiny/app-page-builder/editor/recoil/actions";
import type {
    EventActionCallable,
    EventActionHandlerCallableArgs
} from "@webiny/app-page-builder/types";
import type { CreateElementEventActionArgsType } from "@webiny/app-page-builder/editor/recoil/actions/createElement/types";
import type { UpdateElementActionArgsType } from "@webiny/app-page-builder/editor/recoil/actions/updateElement/types";
import { isContainerElementType, isFieldElementType } from "../../../../shared/constants";
import { useContainer } from "../ContainerProvider";
import {
    FunnelFieldDefinitionModel,
    FunnelFieldDefinitionModelDto
} from "../../../../shared/models/FunnelFieldDefinitionModel";
import { useDisclosure } from "../../../admin/useDisclosure";
import { FieldSettingsDialog } from "../../../admin/FieldSettingsDialog";

export const ContainerAdminEventHandlers = () => {
    const eventHandler = useEventActionHandler();
    const updateElement = useUpdateElement();
    const {
        open: showFieldSettingsDialog,
        close: hideFieldSettingsDialog,
        isOpen: isFieldSettingsDialogShown,
        data: createdField
    } = useDisclosure<FunnelFieldDefinitionModel>();

    const container = useContainer();
    const { funnelVm } = container;

    const [activeElementId] = useActiveElementId();
    const [createdEditorElement] = useElementById(activeElementId);

    const createOnElementEventHandler = useCallback(
        function <TArgs extends EventActionHandlerCallableArgs = any>(
            handler: (args: TArgs) => void
        ): EventActionCallable<TArgs> {
            return (_, __, args) => {
                if (!args || !funnelVm) {
                    return { actions: [] };
                }

                handler(args);

                return { actions: [] };
            };
        },
        [funnelVm]
    );

    const onElementCreate = useCallback(
        createOnElementEventHandler<CreateElementEventActionArgsType>(args => {
            const { element: createdElement } = args;

            if (!isFieldElementType(createdElement.type)) {
                return;
            }

            funnelVm.addField({
                ...createdElement.data,
                stepId: funnelVm.getActiveStepId()
            } as FunnelFieldDefinitionModelDto);

            const fieldClone = funnelVm.getFieldById(createdElement.data.id)!.clone();
            showFieldSettingsDialog(fieldClone);
        }),
        [funnelVm]
    );

    const onElementUpdate = useCallback(
        createOnElementEventHandler<UpdateElementActionArgsType>(args => {
            const { element: updatedElement } = args;
            if (isFieldElementType(updatedElement.type)) {
                funnelVm.updateField(updatedElement.data.id, updatedElement.data);
                return;
            }

            if (isContainerElementType(updatedElement.type)) {
                funnelVm.funnel.populate(updatedElement.data);
                return;
            }
        }),
        [funnelVm]
    );

    useEffect(() => {
        const offCreateElement = eventHandler.on(CreateElementActionEvent, onElementCreate);
        const offUpdateElement = eventHandler.on(UpdateElementActionEvent, onElementUpdate);

        return () => {
            offCreateElement();
            offUpdateElement();
        };
    }, [funnelVm]);

    return (
        <FieldSettingsDialog
            open={isFieldSettingsDialogShown}
            field={createdField!}
            onClose={hideFieldSettingsDialog}
            onSubmit={data => {
                updateElement({ ...createdEditorElement!, data }, { history: true });
                hideFieldSettingsDialog();
            }}
        />
    );
};

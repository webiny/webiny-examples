import React from "react";
import { ElementControls } from "@webiny/app-page-builder/editor/contexts/EditorPageElementsProvider/ElementControls";
import { useRenderer } from "@webiny/app-page-builder-elements";
import {
    useActiveElementId,
    useElementById,
    useUpdateElement
} from "@webiny/app-page-builder/editor";
import styled from "@emotion/styled";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import { IconButton } from "@webiny/ui/Button";
import { isFieldElementType } from "../../shared/constants";
import { Tooltip } from "@webiny/ui/Tooltip";
import { FieldSettingsDialog } from "../admin/FieldSettingsDialog";
import { useDisclosure } from "../admin/useDisclosure";
import { FunnelFieldDefinitionModel } from "../../shared/models/FunnelFieldDefinitionModel";
import { useContainer } from "./container/ContainerProvider";

const EditFieldButtonWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
`;

const EditFieldButton = styled(IconButton)`
    padding: 0;
    margin: 4px;
    width: 36px;
    height: 36px;

    svg {
        width: 20px;
        height: 20px;
    }
`;

export const DecoratedElementControls = ElementControls.createDecorator(Component => {
    return function DecoratedElementControls(props) {
        const [activeElementId] = useActiveElementId();
        const { funnelVm } = useContainer();
        const { getElement } = useRenderer();
        const element = getElement();
        const [editorElement] = useElementById(element.id);
        const updateElement = useUpdateElement();

        const {
            open: showFieldSettingsDialog,
            close: hideFieldSettingsDialog,
            isOpen: isFieldSettingsDialogShown,
            data: selectedField
        } = useDisclosure<FunnelFieldDefinitionModel>();

        if (!isFieldElementType(element.type)) {
            return <Component {...props} />;
        }

        const field = funnelVm.getFieldById(element.data.id);
        if (!field) {
            return <Component {...props} />;
        }

        const isActive = activeElementId === element.id;
        const isHighlighted = editorElement?.isHighlighted ?? false;
        if (!isActive && !isHighlighted) {
            return <Component {...props} />;
        }

        return (
            <>
                <EditFieldButtonWrapper>
                    <Tooltip content={"Edit field setting"} placement={"bottom"}>
                        <EditFieldButton
                            icon={<EditIcon />}
                            onClick={() => showFieldSettingsDialog(field.clone())}
                        />
                    </Tooltip>
                </EditFieldButtonWrapper>

                <FieldSettingsDialog
                    open={isFieldSettingsDialogShown}
                    field={selectedField!}
                    onClose={hideFieldSettingsDialog}
                    onSubmit={data => {
                        updateElement({ ...editorElement!, data }, { history: false });
                        hideFieldSettingsDialog();
                    }}
                />

                <Component {...props} />
            </>
        );
    };
});

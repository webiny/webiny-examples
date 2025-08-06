import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { Icon } from "./Icon";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as DragIndicatorIcon } from "@material-design-icons/svg/outlined/drag_indicator.svg";

import { ButtonActionDto, ButtonElementData } from "../types";
import { registry } from "../buttonActions/registry";
import { useActiveElement, useUpdateElement } from "@webiny/app-page-builder/editor";
import { PbElement } from "@webiny/app-page-builder/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

interface ActionsListItemProps {
    action: ButtonActionDto;
}

export const ActionsListItem = ({ action }: ActionsListItemProps) => {
    const { showConfirmation } = useConfirmationDialog({
        title: "Remove action",
        message: <p>Are you sure you want to remove this action?</p>
    });

    const [element] = useActiveElement<PbElement<ButtonElementData>>();
    const updateElement = useUpdateElement();

    const deleteAction = useCallback(
        (actionId: string) => {
            updateElement(
                {
                    ...element,
                    data: {
                        ...element.data,
                        actions: element.data.actions.filter(action => action.id !== actionId)
                    }
                },
                { history: true }
            );
        },
        [element]
    );

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: action.id
    });

    const actionDefinition = registry.find(actionDef => actionDef.type === action.type)!;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <ListItemStyled ref={setNodeRef} style={style}>
            <PageTitleContainer>{actionDefinition.name}</PageTitleContainer>

            <IconsContainer>
                <Icon element={<StyledDragIcon />} {...attributes} {...listeners} />
                <Icon
                    element={<DeleteIcon />}
                    onClick={() => {
                        showConfirmation(async () => deleteAction(action.id));
                    }}
                />
            </IconsContainer>
        </ListItemStyled>
    );
};

import React, { useCallback } from "react";
import styled from "@emotion/styled";
import Wrapper from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Wrapper";
import { useActiveElement, useUpdateElement } from "@webiny/app-page-builder/editor";
import useUpdateHandlers from "@webiny/app-page-builder/editor/plugins/elementSettings/useUpdateHandlers";
import InputField from "@webiny/app-page-builder/editor/plugins/elementSettings/components/InputField";
import { PbElement } from "@webiny/app-page-builder/types";
import { ButtonActionDefinition, ButtonActionDto, ButtonElementData } from "./types";
import { ButtonIcon } from "@webiny/ui/Button";
import { ButtonDefault } from "@webiny/ui/Button";
import { ReactComponent as DownButton } from "@material-design-icons/svg/outlined/arrow_drop_down.svg";
import { Menu, MenuItem } from "@webiny/ui/Menu";
import { registry } from "./buttonActions/registry";
import { getRandomId } from "../../../shared/getRandomId";
import { ActionsListItem } from "./AdvancedSettings/ActionsListItem";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { Typography } from "@webiny/ui/Typography";

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

const StyledAccordion = styled(Accordion)`
    overflow: hidden;

    .accordion-content {
        padding: 0;
    }
`;

const StyledMenuItem = styled(MenuItem)`
    height: auto !important;
    padding: 5px 10px;
`;

const AddPageButton = styled(ButtonDefault)`
    display: block;
    margin: 20px auto;
`;

export const AdvancedSettings = () => {
    const [element] = useActiveElement<PbElement<ButtonElementData>>();

    const { getUpdateValue, getUpdatePreview } = useUpdateHandlers({
        element,
        dataNamespace: "data"
    });

    const updateLabel = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => getUpdateValue("label")(event.target.value),
        [getUpdateValue]
    );

    const updateElement = useUpdateElement();

    const addAction = useCallback(
        (actionType: ButtonActionDefinition["type"]) => {
            const actionDef = registry.find(action => action.type === actionType)!;
            const actions = [
                ...element.data.actions,
                {
                    id: getRandomId(),
                    type: actionDef.type,
                    extra: actionDef.extra || {}
                } as ButtonActionDto
            ];

            const label = actionDef.updateButtonLabel || element.data.label;

            updateElement(
                {
                    ...element,
                    data: {
                        ...element.data,
                        label,
                        actions
                    }
                },
                { history: true }
            );
        },
        [element.data.actions, updateElement]
    );

    const updateLabelPreview = useCallback(
        (value: string) => getUpdatePreview("label")(value),
        [getUpdatePreview]
    );

    const addButtonActionOptions = registry
        .filter(action => {
            return !action.canAdd || action.canAdd({ element });
        })
        .map(action => ({
            label: action.name,
            value: action.type,
            description: action.description || ""
        }));

    const hasActions = element.data.actions.length > 0;
    const hasAddButtonActionOptions = addButtonActionOptions.length > 0;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    return (
        <>
            <StyledAccordion title={"Actions"} defaultValue={true}>
                <>
                    {hasActions ? (
                        <>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={event => {
                                    const { active, over } = event;
                                    if (active.id === over?.id) {
                                        return;
                                    }

                                    const { actions } = element.data;
                                    const fromIndex = actions.findIndex(
                                        action => action.id === active.id
                                    );
                                    const toIndex = actions.findIndex(
                                        action => action.id === over?.id
                                    );

                                    const elementData = {
                                        ...element,
                                        data: {
                                            ...element.data,
                                            actions: actions.map((action, index) => {
                                                if (index === fromIndex) {
                                                    return actions[toIndex];
                                                }
                                                if (index === toIndex) {
                                                    return actions[fromIndex];
                                                }
                                                return action;
                                            })
                                        }
                                    };

                                    updateElement(elementData, { history: true });
                                }}
                                modifiers={[restrictToVerticalAxis]}
                            >
                                <SortableContext
                                    items={element.data.actions}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {element.data.actions.map(action => {
                                        return <ActionsListItem action={action} key={action.id} />;
                                    })}
                                </SortableContext>
                            </DndContext>
                        </>
                    ) : (
                        <div style={{ textAlign: "center", margin: "20px 0" }}>
                            <p>No actions added yet.</p>
                        </div>
                    )}

                    <div style={{ textAlign: "center", position: "relative" }}>
                        <Menu
                            handle={
                                <AddPageButton
                                    onClick={() => {}}
                                    disabled={!hasAddButtonActionOptions}
                                >
                                    Add action ({addButtonActionOptions.length})
                                    <ButtonIcon icon={<DownButton />} />
                                </AddPageButton>
                            }
                        >
                            {hasAddButtonActionOptions ? (
                                addButtonActionOptions.map(option => (
                                    <StyledMenuItem
                                        key={option.value}
                                        onClick={() => addAction(option.value)}
                                    >
                                        <div style={{ maxWidth: 300 }}>
                                            <div>{option.label}</div>
                                            <div>
                                                <Typography use={"caption"}>
                                                    {option.description}
                                                </Typography>
                                            </div>
                                        </div>
                                    </StyledMenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No actions available to add.</MenuItem>
                            )}
                        </Menu>
                    </div>
                </>
            </StyledAccordion>

            <StyledAccordion title={"Other"} defaultValue={true}>
                <Wrapper label={"Label"} leftCellSpan={4} rightCellSpan={8}>
                    <InputField
                        placeholder={"Label"}
                        value={element.data.label}
                        onChange={updateLabelPreview}
                        onBlur={updateLabel}
                    />
                </Wrapper>
            </StyledAccordion>
        </>
    );
};

import React from "react";
import styled from "@emotion/styled";
import camelCase from "lodash/camelCase";
import { OptionsListItem, SortableContainerContextProvider } from "./OptionsList/OptionsListItem";
import { AddOptionInput } from "./OptionsList/AddOptionInput";
import { FieldOption } from "./OptionsList/types";
import { Icon } from "@webiny/ui/Icon";
import { Cell, Grid } from "@webiny/ui/Grid";
import { ReactComponent as HandleIcon } from "@material-design-icons/svg/outlined/drag_indicator.svg";
import { validation } from "@webiny/validation";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Bind, useBind } from "@webiny/form";
import { getRandomId } from "../../../../../shared/getRandomId";

const OptionListItem = styled.li`
    z-index: 10;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--mdc-theme-background);
    background: var(--mdc-theme-surface);

    &:hover {
        background: var(--mdc-theme-background);
    }

    &:last-child {
        border: none;
    }
`;

const DragHandle = () => <Icon icon={<HandleIcon style={{ cursor: "pointer" }} />} />;

interface OptionsListProps {
    multiple?: boolean;
}

interface OptionsListBindParams {
    validation: any;
    value: FieldOption[];
    onChange: (values: FieldOption[]) => void;
}

const OptionsList = ({ multiple }: OptionsListProps) => {
    const {
        validation: optionsValidation,
        value: optionsValue,
        onChange: setOptionsValue
    } = useBind({
        name: "extra.options",
        validators: validation.create("required,minLength:1")
    }) as OptionsListBindParams;

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id === over?.id) {
            return;
        }

        const oldIndex = optionsValue.findIndex(option => option.id === active.id);
        const newIndex = optionsValue.findIndex(option => option.id === over?.id);

        const sortedOptions = arrayMove(optionsValue, oldIndex, newIndex);
        setOptionsValue(sortedOptions);
    };

    return (
        <>
            <div>Options</div>
            <Grid>
                <Cell span={12}>
                    <AddOptionInput
                        options={optionsValue}
                        validation={optionsValidation}
                        onAdd={label => {
                            const newValue = Array.isArray(optionsValue) ? [...optionsValue] : [];
                            newValue.push({
                                id: getRandomId(),
                                value: camelCase(label),
                                label
                            });
                            setOptionsValue(newValue);
                        }}
                    />
                </Cell>
            </Grid>

            <div style={{ position: "relative" }}>
                {Array.isArray(optionsValue) && optionsValue.length > 0 ? (
                    <>
                        <SortableContainerContextProvider
                            optionsValue={optionsValue}
                            onDragEnd={onDragEnd}
                        >
                            {optionsValue.map((item, index) => (
                                <OptionListItem key={`item-${index}`}>
                                    <OptionsListItem
                                        dragHandle={<DragHandle />}
                                        multiple={!!multiple}
                                        option={item}
                                        Bind={Bind}
                                        // We probably want an edit option here as well.
                                        // Did not do it because of lack of time.
                                        // editOption={() => onEditOption(item, index)}
                                        deleteOption={() => {
                                            const newValue = [...optionsValue];
                                            newValue.splice(index, 1);
                                            setOptionsValue(newValue);
                                        }}
                                    />
                                </OptionListItem>
                            ))}
                        </SortableContainerContextProvider>
                    </>
                ) : (
                    <div style={{ padding: 40, textAlign: "center" }}>No options added.</div>
                )}
            </div>
        </>
    );
};

export default OptionsList;

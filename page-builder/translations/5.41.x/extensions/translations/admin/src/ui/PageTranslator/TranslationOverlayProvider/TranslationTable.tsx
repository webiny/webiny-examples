import React from "react";
import { TranslatedCollection } from "@webiny/app-page-builder/translations";
import { usePageElements } from "@webiny/app-page-builder-elements";
import type { ElementInputType, DecoratableRenderer } from "@webiny/app-page-builder-elements";
import { TranslatableItemContext } from "./TranslatableItemContext";
import { ReadOnlyRichText } from "./TranslationComponents/ReadOnlyRichText";
import { EditableRichText } from "./TranslationComponents/EditableRichText";
import { EditableText } from "./TranslationComponents/EditableText";
import { Cell, Row, ScrollList } from "./Table";
import { TranslatedItem } from "./ElementTranslationsProvider";

type Item = TranslatedCollection<TranslatableItemContext>["items"][0];

interface TranslationTableProps {
    sourceCollection: TranslatedCollection<TranslatableItemContext>;
    onChange: (translatedCollection: TranslatedCollection<TranslatableItemContext>) => void;
}

const getInputType = (item: Item, renderer: DecoratableRenderer) => {
    const inputName = item.context?.input.name;
    if (!inputName) {
        return "text";
    }

    const input = renderer.inputs ? renderer.inputs[inputName] : undefined;
    return input ? input.getType() : "text";
};

const getStatusColor = (item: TranslatedItem) => {
    if (!item.translatedOn) {
        return "#b2b2b2";
    }

    const baseValueModifiedOn = item.baseValueModifiedOn.getTime();
    const translatedOn = item.translatedOn.getTime();

    if (baseValueModifiedOn < translatedOn) {
        return "#73b273";
    }

    if (baseValueModifiedOn > translatedOn) {
        return "#ff5e5e";
    }

    return "none";
};

export const TranslationTable = ({ sourceCollection, onChange }: TranslationTableProps) => {
    const { getRenderers } = usePageElements();

    const renderers = getRenderers();

    const setTranslation = (item: Item, value: string) => {
        const index = sourceCollection.items.findIndex(itm => itm.itemId === item.itemId);
        if (index < 0) {
            return;
        }

        const newItems = [
            ...sourceCollection.items.slice(0, index),
            { ...item, value },
            ...sourceCollection.items.slice(index + 1)
        ];

        onChange({ ...sourceCollection, items: newItems });
    };

    return (
        <ScrollList>
            {sourceCollection.items.map(item => {
                // Determine input type (this affects the UI component that will be rendered)
                const elementType = item.context ? item.context.element.type : "paragraph";
                const inputType = getInputType(item, renderers[elementType]);

                return (
                    <Row key={item.itemId}>
                        <Cell>
                            <ReadOnlyValue
                                item={item}
                                value={item.baseValue}
                                inputType={inputType}
                            />
                        </Cell>
                        <Cell color={getStatusColor(item)}>
                            <EditableValue
                                item={item}
                                value={item.value}
                                inputType={inputType}
                                onChange={value => setTranslation(item, value)}
                            />
                        </Cell>
                    </Row>
                );
            })}
        </ScrollList>
    );
};

interface ReadOnlyValueProps {
    item: Item;
    value: string;
    inputType: ElementInputType;
}

const ReadOnlyValue = ({ item, value, inputType }: ReadOnlyValueProps) => {
    if (inputType === "richText") {
        return <ReadOnlyRichText value={value} />;
    }

    return <>{value}</>;
};

interface EditableValueProps {
    item: Item;
    value?: string;
    inputType: ElementInputType;
    onChange: (value: string) => void;
}

const placeholder = "Add translation...";

const EditableValue = ({ item, value = "", inputType, onChange }: EditableValueProps) => {
    const context = item.context;
    if (!context) {
        return <span>Missing item context!</span>;
    }

    if (inputType === "richText") {
        return (
            <EditableRichText
                type={context.element.type === "heading" ? "heading" : "paragraph"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        );
    }

    return <EditableText value={value || ""} onChange={onChange} placeholder={placeholder} />;
};

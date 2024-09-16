import React from "react";
import { ElementRendererInputs } from "@webiny/app-page-builder-elements";
import { useElementTranslations } from "./TranslationOverlayProvider/ElementTranslationsProvider";

export const InjectTranslatedValues = ElementRendererInputs.createDecorator(Original => {
    return function ElementRendererInputs(props) {
        const { element, values } = props;
        try {
            const { translatedCollection } = useElementTranslations();

            const translatedItems = translatedCollection.items.filter(
                item => item.context?.element.id === element.id
            );

            const translatedValues = translatedItems.reduce<Record<string, unknown>>(
                (acc, item) => {
                    const inputName = item.context?.input.name;
                    if (!inputName || !item.value) {
                        return acc;
                    }

                    return { ...acc, [inputName]: item.value };
                },
                values
            );

            return <Original {...props} values={translatedValues} />;
        } catch {
            return <Original {...props} />;
        }
    };
});

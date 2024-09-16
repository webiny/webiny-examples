import React from "react";
import { ExtractTranslatableValues } from "@webiny/app-page-builder/translations";
import { LanguageModule } from "./ui/Languages/LanguageModule";
import { PageTranslatorModule } from "./ui/PageTranslator/Module";

export const Extension = () => {
    return (
        <>
            <PageTranslatorModule />
            <LanguageModule />
            <ExtractTranslatableValues
                createTranslatableItem={({ value, input, element }) => {
                    return {
                        value: value,
                        itemId: `element:${element.id}.${input.name}`,
                        context: {
                            element: {
                                id: element.id,
                                type: element.type
                            },
                            input: {
                                name: input.name
                            }
                        }
                    };
                }}
            />
        </>
    );
};

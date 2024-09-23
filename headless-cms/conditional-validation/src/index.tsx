import React from "react";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { useForm } from "@webiny/form";

const { FieldElement } = ContentEntryEditorConfig;

const validators = {
    low: {
        helpText: "Enter value between 0 and 99.",
        validators: [
            {
                name: "lte",
                message: "Value is too high! Enter value lower than 100.",
                settings: {
                    value: 99
                }
            }
        ]
    },
    medium: {
        helpText: "Enter value between 100 and 500.",
        validators: [
            {
                name: "gte",
                message: "Value is too low! Enter value between 100 and 500.",
                settings: {
                    value: 100
                }
            },
            {
                name: "lte",
                message: "Value is too high! Enter value between 100 and 500.",
                settings: {
                    value: 500
                }
            }
        ]
    },
    high: {
        helpText: "Enter value above 500.",
        validators: [
            {
                name: "gte",
                message: "Value is too low! Enter value above 500.",
                settings: {
                    value: 500
                }
            }
        ]
    }
};

type PricingClassValue = "low" | "medium" | "high" | undefined;

const ConditionalValidation = FieldElement.createDecorator(Original => {
    return function ConditionalRender(props) {
        const form = useForm();
        const pricingClass = form.getValue("pricingClass") as PricingClassValue;

        const field = props.field;
        if (field.fieldId === "price" && pricingClass !== undefined) {
            return (
                <Original
                    {...props}
                    field={{
                        ...field,
                        helpText: validators[pricingClass].helpText,
                        validation: validators[pricingClass].validators
                    }}
                />
            );
        }

        return <Original {...props} />;
    };
});

export const Extension = () => {
    return (
        <>
            <ContentEntryEditorConfig>
                <ConditionalValidation modelIds={["conditionalValidation"]} />
            </ContentEntryEditorConfig>
        </>
    );
};

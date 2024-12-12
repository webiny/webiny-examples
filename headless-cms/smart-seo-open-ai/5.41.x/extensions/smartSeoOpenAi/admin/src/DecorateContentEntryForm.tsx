import React from "react";
import { ContentEntryForm } from "@webiny/app-headless-cms/admin/components/ContentEntryForm/ContentEntryForm";
import { FieldTracker } from "./FieldTracker";

/**
 * Decorate the ContentEntryForm with a FieldTracker.
 * FieldTracker monitors changes in form fields, enabling dynamic updates
 * and interaction with external services like OpenAI for SEO recommendations.
 */
export const DecorateContentEntryForm = ContentEntryForm.createDecorator(Original => {
    return function ContentEntryForm(props) {
        return (
            // Use the FieldTracker component to track changes in the form fields
            <FieldTracker>
                <Original {...props} />
            </FieldTracker>
        );
    };
});

import { createLexicalStateTransformer } from "@webiny/lexical-converter";
import { FieldWithValue } from "./FieldTracker";

const transformer = createLexicalStateTransformer();

/**
 * Extracts HTML from rich-text (lexical content) fields.
 * Filters fields of type "rich-text" and converts their content to HTML for further processing. We will pass this HTML content to OpenAI.
 */
export const extractRichTextHtml = (fields: FieldWithValue[]) => {
    return fields
        .filter(field => field.type === "rich-text" && !!field.value)
        .map(field => transformer.toHtml(field.value));
};
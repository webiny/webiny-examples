import React, { useState } from "react";
import gql from "graphql-tag";
import { useForm } from "@webiny/form";
import { ContentEntryEditorConfig, useApolloClient } from "@webiny/app-headless-cms";
import { ButtonSecondary, ButtonIcon } from "@webiny/ui/Button";
import { ReactComponent as MagicIcon } from "@material-design-icons/svg/round/school.svg";
import { useSnackbar } from "@webiny/app-admin";
import { FieldWithValue, useFieldTracker } from "./FieldTracker";
import { extractRichTextHtml } from "./extractFromRichText";

const { Actions } = ContentEntryEditorConfig;

const GENERATE_SEO_QUERY = gql`
    query GenerateSeo($input: GenerateSeoInput!) {
        generateSeo(input: $input) {
            title
            description
            keywords
        }
    }
`;

const GetSeoData = () => {
    const client = useApolloClient();
    const form = useForm();
    const { showSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const { fields } = useFieldTracker();

    const askChatGpt = async () => {
        setLoading(true);
        try {
            const { data } = await client.query({
                query: GENERATE_SEO_QUERY,
                variables: {
                    input: {
                        content: extractRichTextHtml(fields).join("\n")
                    }
                }
            });

            const seo = data?.generateSeo;
            if (!seo) {
                console.error("Invalid response received from AI.");
                showSnackbar("No valid data received from AI.");
                return;
            }

            populateSeoTitle(form, fields, seo.title);
            populateSeoDescription(form, fields, seo.description);
            populateSeoKeywords(form, fields, seo.keywords);

            showSnackbar("Success! We've populated the SEO fields with the recommended values.");
        } catch (err) {
            console.error("Error during SEO generation:", err);
            showSnackbar("We were unable to get a recommendation from AI at this point.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ButtonSecondary onClick={askChatGpt} disabled={loading}>
            <ButtonIcon icon={<MagicIcon />} /> AI-optimized SEO
        </ButtonSecondary>
    );
};

const populateSeoTitle = (
    form: ReturnType<typeof useForm>,
    fields: FieldWithValue[],
    value: string
) => {
    const field = fields.find(field => field.type === "seoTitle");
    if (field) {
        form.setValue(field.path, value);
    }
};

const populateSeoDescription = (
    form: ReturnType<typeof useForm>,
    fields: FieldWithValue[],
    value: string
) => {
    const field = fields.find(field => field.type === "seoDescription");
    if (field) {
        form.setValue(field.path, value);
    }
};

interface Tag {
    tagName: string;
    tagValue: string;
}

const populateSeoKeywords = (
    form: ReturnType<typeof useForm>,
    fields: FieldWithValue[],
    keywords: string[]
) => {
    const field = fields.find(field => field.type === "seoMetaTags");
    if (!field) {
        console.warn("No meta tags field!");
        return;
    }

    const tags: Tag[] = Array.isArray(field.value) ? field.value : [];
    const tagsWithoutKeywords = tags.filter(tag => tag.tagName !== "keywords");

    if (field) {
        form.setValue(field.path, [
            ...tagsWithoutKeywords,
            { tagName: "keywords", tagValue: keywords.join(", ") }
        ]);
    }
};

export const SmartSeo = () => {
    return (
        <Actions.ButtonAction
            name={"askAi"}
            before={"save"}
            element={<GetSeoData />}
            modelIds={["article-smart-seo"]}
        />
    );
};
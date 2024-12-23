import React, { useState, useEffect } from "react";
import { ContentEntryEditorConfig, useQuery } from "@webiny/app-headless-cms";
import { ButtonSecondary, ButtonIcon } from "@webiny/ui/Button";
import { ReactComponent as MagicIcon } from "@material-design-icons/svg/round/school.svg";
import { useSnackbar } from "@webiny/app-admin";
import { FieldWithValue, useFieldTracker } from "./FieldTracker";
import { extractRichTextHtml } from "./extractFromRichText";
import gql from "graphql-tag";

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
    const { showSnackbar } = useSnackbar();
    const [triggerQuery, setTriggerQuery] = useState(false);
    const [loading, setLoading] = useState(false);
    const { fields } = useFieldTracker();

    const { data, error, refetch } = useQuery(GENERATE_SEO_QUERY, {
        variables: {
            input: {
                content: extractRichTextHtml(fields).join("\n"),
            },
        },
        skip: true, // Prevent automatic execution of the query
    });

    useEffect(() => {
        if (triggerQuery) {
            setLoading(true);
            refetch()
                .then(({ data }) => {
                    const seo = data?.generateSeo;
                    if (!seo) {
                        console.error("Invalid response received from AI.");
                        showSnackbar("No valid data received from AI.");
                        return;
                    }

                    populateSeoTitle(fields, seo.title);
                    populateSeoDescription(fields, seo.description);
                    populateSeoKeywords(fields, seo.keywords);

                    showSnackbar("Success! We've populated the SEO fields with the recommended values.");
                })
                .catch((err) => {
                    console.error("Error during SEO generation:", err);
                    showSnackbar("We were unable to get a recommendation from AI at this point.");
                })
                .finally(() => {
                    setLoading(false);
                    setTriggerQuery(false);
                });
        }
    }, [triggerQuery, refetch, fields, showSnackbar]);

    const askChatGpt = () => {
        setTriggerQuery(true);
    };

    return (
        <ButtonSecondary onClick={askChatGpt} disabled={loading}>
            <ButtonIcon icon={<MagicIcon />} /> AI-optimized SEO
        </ButtonSecondary>
    );
};

const populateSeoTitle = (fields: FieldWithValue[], value: string) => {
    const field = fields.find((field) => field.type === "seoTitle");
    if (field) field.onChange(value);
};

const populateSeoDescription = (fields: FieldWithValue[], value: string) => {
    const field = fields.find((field) => field.type === "seoDescription");
    if (field) field.onChange(value);
};

interface Tag {
    tagName: string;
    tagValue: string;
}

const populateSeoKeywords = (fields: FieldWithValue[], keywords: string[]) => {
    const field = fields.find((field) => field.type === "seoMetaTags");
    if (!field) {
        console.warn("No meta tags field!");
        return;
    }

    const tags: Tag[] = Array.isArray(field.value) ? field.value : [];
    const tagsWithoutKeywords = tags.filter((tag) => tag.tagName !== "keywords");

    field.onChange([
        ...tagsWithoutKeywords,
        { tagName: "keywords", tagValue: keywords.join(", ") },
    ]);
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
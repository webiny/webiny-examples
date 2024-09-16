import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import type { PbPageData } from "@webiny/app-page-builder/types";
import { TranslatedCollection } from "./TranslatedCollection";
import { Language } from "./Language";

const QUERY = gql`
    query GetTranslatedCollection($collectionId: ID!, $languageCode: String!) @ps(cache: true) {
        translations {
            getTranslatedCollection(collectionId: $collectionId, languageCode: $languageCode) {
                data {
                    collectionId
                    items {
                        itemId
                        value
                        context
                    }
                }
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;

export const useGetTranslatedCollection = (page: PbPageData | null, language: Language) => {
    const { data, loading } = useQuery(QUERY, {
        variables: { collectionId: `page:${page?.id}`, languageCode: language.code },
        skip: !page
    });

    if (!page) {
        return { loading: false, translatedCollection: undefined };
    }

    if (loading) {
        return { loading, translatedCollection: undefined };
    }

    const translatedCollection = data.translations.getTranslatedCollection.data;

    return { loading, translatedCollection: translatedCollection as TranslatedCollection };
};

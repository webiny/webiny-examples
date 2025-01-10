import React from "react";
import { createRenderer, useLoader, useRenderer, Element } from "@webiny/app-page-builder-elements";

import { request } from "graphql-request";

export interface CmsEntriesElementData {
    cmsModelId?: string;
    pbElementId?: string;
}

export const INITIAL_ELEMENT_DATA: CmsEntriesElementData = {
    cmsModelId: "",
    pbElementId: ""
};

import { getGqlApiUrl, getHeadlessCmsGqlApiUrl } from "@webiny/app-website";
import { ResponsiveElementsProvider } from "@webiny/app-page-builder/admin/components/ResponsiveElementsProvider";

const GQL_API_URL = getGqlApiUrl();

// When in Admin, we want to use the 'preview' GQL API URL to list CMS entries. This way we'll be able to see
// non-published entries as well. When in Website, we want to use the 'read' GQL API URL to list CMS entries.
const { preview: CMS_PREVIEW_API_URL, read: CMS_READ_API_URL } = getHeadlessCmsGqlApiUrl();

// Create token via Admin app / API Keys section (could also be assigned va env variable).
// A token that has READ access to the CMS Article content model is needed.
const API_TOKEN = "<...>";

const createEntriesListQuery = (modelId: string) => {
    // TODO: This must return dynamically generated query based on the model ID.
    // TODO: For now it's just hardcoded to list Article CMS entries.
    return /* GraphQL */ `
        query ListArticles {
            listArticles {
                data {
                    id
                    title
                    content
                }
                error {
                    code
                    message
                }
            }
        }
    `;
};

const GET_PB_ELEMENT_QUERY = /* GraphQL */ `
    query GetPbElement($pbElementId: ID!) {
        pageBuilder {
            getPageElement(id: $pbElementId) {
                data {
                    id
                    name
                    content
                }
            }
        }
    }
`;

export interface GqlResponseError {
    code: string;
    message: string;
    data?: Record<string, any>;
}

// TODO: Define the shape of the data.
type CmsEntry = Record<string, any>;

export interface ListCmsEntriesGqlResponse {
    // TODO: Hardcoded to articles. This should be dynamic based on the model ID.
    listArticles: {
        data: CmsEntry[];
        error: GqlResponseError | null;
    };
}

interface GetPbPageElementQueryResponse {
    pageBuilder: {
        getPageElement: {
            data: {
                id: string;
                name: string;
                content: string;
            };
            error: GqlResponseError | null;
        };
    };
}

const CmsEntriesContext = React.createContext<CmsEntry>({});

export const useCmsEntry = () => {
    return React.useContext(CmsEntriesContext);
};

export const CmsEntries = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement<CmsEntriesElementData>();

    const getPbElementLoader = useLoader<any | null, Error>(
        async () => {
            if (!element.data.cmsModelId || !element.data.pbElementId) {
                return null;
            }

            return request<GetPbPageElementQueryResponse>(
                GQL_API_URL,
                GET_PB_ELEMENT_QUERY,
                {
                    pbElementId: element.data.pbElementId
                },
                { authorization: API_TOKEN }
            );
        },
        {
            // If adding filters to list queries, they should also go here.
            cacheKey: [element.data.pbElementId]
        }
    );

    const listCmsEntriesLoader = useLoader<ListCmsEntriesGqlResponse | null, Error>(
        async () => {
            if (!element.data.cmsModelId || !element.data.pbElementId) {
                return null;
            }

            // If in actual website, we should use the `CMS_READ_API_URL` instead of `CMS_PREVIEW_API_URL`.
            const LIST_ENTRIES = createEntriesListQuery(element.data.cmsModelId);
            return request<ListCmsEntriesGqlResponse>(
                CMS_PREVIEW_API_URL,
                LIST_ENTRIES,
                {
                    /* Extra variables can go here. */
                },
                { authorization: API_TOKEN }
            );
        },
        {
            // If adding filters to list queries, they should also go here.
            cacheKey: [element.data.cmsModelId]
        }
    );

    const loading = listCmsEntriesLoader.loading || getPbElementLoader.loading;
    if (loading) {
        return <>Loading...</>;
    }

    const error = listCmsEntriesLoader.error || getPbElementLoader.error;
    if (error) {
        return <>An error occurred: {error.message}</>;
    }

    const pbElement = getPbElementLoader.data?.pageBuilder.getPageElement.data;
    const cmsEntriesList = listCmsEntriesLoader.data?.listArticles;

    if (!pbElement || !pbElement.id) {
        return <>No page element found.</>;
    }

    if (!cmsEntriesList || !cmsEntriesList.data) {
        return <>No entries found.</>;
    }

    return (
        // Note the `ResponsiveElementsProvider` provider.
        // Only needed when in editor. This basically ensures child elements are rendered
        // as if we were rendering them on a real page. This is fine because the page elements
        // below don't need to be interactive. They basically just render content and that's it.
        <ResponsiveElementsProvider>
            {cmsEntriesList.data.map(cmsEntry => {
                return (
                    <CmsEntriesContext.Provider value={cmsEntry} key={cmsEntry["id"]}>
                        <Element element={pbElement.content} />
                    </CmsEntriesContext.Provider>
                );
            })}
        </ResponsiveElementsProvider>
    );
});

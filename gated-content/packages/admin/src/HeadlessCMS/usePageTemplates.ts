import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const LIST_PAGE_TEMPLATES = gql`
    query ListPageTemplates {
        pageBuilder {
            listPageTemplates {
                data {
                    id
                    title
                }
                error {
                    code
                    data
                    message
                }
            }
        }
    }
`;

interface ListPageTemplatesQueryResponse {
    pageBuilder: {
        listPageTemplates: {
            data: Array<{ id: string; title: string }>;
        };
    };
}

export function usePageTemplates() {
    const { data, loading } = useQuery<ListPageTemplatesQueryResponse>(LIST_PAGE_TEMPLATES);

    const templates = loading || !data ? [] : data.pageBuilder.listPageTemplates.data;

    return {
        options: templates.map(template => ({
            label: template.title,
            value: template.id
        }))
    };
}

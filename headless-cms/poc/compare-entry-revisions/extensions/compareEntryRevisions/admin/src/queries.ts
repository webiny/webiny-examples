import gql from "graphql-tag";

// GraphQL query to compare entry revisions by ID
export const COMPARE_ENTRY_REVISIONS_QUERY = gql`
    query CompareEntryRevisions($input: CompareRevisionsInput!) {
        compareEntryRevisions(input: $input) {
            html
            summary
        }
    }
`;

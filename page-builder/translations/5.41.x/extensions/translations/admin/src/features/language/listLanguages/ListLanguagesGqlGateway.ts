import ApolloClient from "apollo-client";
import gql from "graphql-tag";

const QUERY = gql`
    query ListLanguages {
        translations {
            listLanguages {
                data {
                    code
                    direction
                    isBaseLanguage
                    name
                }
            }
        }
    }
`;

export interface LanguageDto {
    name: string;
    code: string;
    direction: "ltr" | "rtl";
    isBaseLanguage: boolean;
}

export class ListLanguagesGqlGateway {
    private client: ApolloClient<any>;

    constructor(client: ApolloClient<any>) {
        this.client = client;
    }

    async execute(): Promise<LanguageDto[]> {
        const { data } = await this.client.query({ query: QUERY, fetchPolicy: "no-cache" });

        return data.translations.listLanguages.data as LanguageDto[];
    }
}

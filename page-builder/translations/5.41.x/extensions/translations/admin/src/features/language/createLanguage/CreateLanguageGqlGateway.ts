import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { WebinyError } from "@webiny/error";
import { LanguageDto } from "./LanguageDto";

const MUTATION = gql`
    mutation CreateLanguage($data: CreateLanguageInput!) {
        translations {
            createLanguage(data: $data) {
                data {
                    code
                    direction
                    isBaseLanguage
                    name
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

export class CreateLanguageGqlGateway {
    private client: ApolloClient<any>;

    constructor(client: ApolloClient<any>) {
        this.client = client;
    }

    async execute(languageDto: LanguageDto): Promise<void> {
        const { data } = await this.client.mutate({
            mutation: MUTATION,
            variables: { data: languageDto }
        });

        const { error } = data.translations.createLanguage;

        if (error) {
            throw new WebinyError(error);
        }
    }
}

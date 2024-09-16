import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { WebinyError } from "@webiny/error";
import { LanguageDto } from "./LanguageDto";

const MUTATION = gql`
    mutation UpdateLanguage($code: String!, $data: UpdateLanguageInput!) {
        translations {
            updateLanguage(code: $code, data: $data) {
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

export class UpdateLanguageGqlGateway {
    private client: ApolloClient<any>;

    constructor(client: ApolloClient<any>) {
        this.client = client;
    }

    async execute({ code, ...data }: LanguageDto): Promise<void> {
        const mutation = await this.client.mutate({
            mutation: MUTATION,
            variables: { code, data }
        });

        const { error } = mutation.data.translations.updateLanguage;

        if (error) {
            throw new WebinyError(error);
        }
    }
}

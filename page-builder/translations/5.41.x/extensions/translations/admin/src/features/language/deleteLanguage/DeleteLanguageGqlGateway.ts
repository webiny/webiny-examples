import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { WebinyError } from "@webiny/error";
import {IDeleteLanguageGateway} from "./IDeleteLanguageGateway";

const MUTATION = gql`
    mutation DeleteLanguage($code: String!) {
        translations {
            deleteLanguage(code: $code) {
                data
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;

export class DeleteLanguageGqlGateway implements IDeleteLanguageGateway {
    private client: ApolloClient<any>;

    constructor(client: ApolloClient<any>) {
        this.client = client;
    }

    async execute(code: string): Promise<void> {
        const { data } = await this.client.mutate({
            mutation: MUTATION,
            variables: { code }
        });

        const { error } = data.translations.deleteLanguage;

        if (error) {
            throw new WebinyError(error);
        }
    }
}

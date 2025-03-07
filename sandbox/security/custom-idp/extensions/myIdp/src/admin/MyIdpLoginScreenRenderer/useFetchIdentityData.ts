import { useCallback } from "react";
import { useTenancy } from "@webiny/app-serverless-cms";
import { useApolloClient } from "@apollo/react-hooks";
import { LOGIN_MT, LOGIN_ST, LoginMtResponse, LoginStResponse } from "./graphql";

export const useFetchIdentityData = () => {
    const { isMultiTenant } = useTenancy();
    const client = useApolloClient();

    return useCallback(async () => {
        const loginMutation = isMultiTenant ? LOGIN_MT : LOGIN_ST;
        return client
            .mutate<LoginStResponse | LoginMtResponse>({
                mutation: loginMutation
            })
            .then(result => {
                const { data, error } = result.data!.security.login;
                if (error) {
                    throw error;
                }

                return data;
            });
    }, [isMultiTenant]);
};

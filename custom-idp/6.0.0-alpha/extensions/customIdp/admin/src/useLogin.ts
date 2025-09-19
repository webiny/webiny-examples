import { useApolloClient } from "@apollo/react-hooks";
import { useTenancy } from "@webiny/app-tenancy";
import { LOGIN_MT, LOGIN_ST } from "./login.gql";

export const useLogin = (graphQLIdentityType: string) => {
    const client = useApolloClient();
    const { isMultiTenant } = useTenancy();

    return async () => {
        const mutation = isMultiTenant
            ? LOGIN_MT(graphQLIdentityType)
            : LOGIN_ST(graphQLIdentityType);

        const response = await client.mutate({ mutation }).catch(err => {
            throw err.networkError.result;
        });

        if (!response) {
            return null;
        }

        const { data, error } = response.data.security.login;
        if (error) {
            throw new Error(error.message);
        }

        return data;
    };
};

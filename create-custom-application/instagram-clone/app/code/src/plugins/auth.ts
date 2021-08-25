import { Auth } from "@aws-amplify/auth";
import { setContext } from "apollo-link-context";
import { ApolloLinkPlugin } from "@webiny/app/plugins/ApolloLinkPlugin";

export default (): ApolloLinkPlugin => {
    return new ApolloLinkPlugin(() => {
        return setContext(async (_, { headers }) => {
            let user;
            try {
                user = await Auth.currentSession();
            } catch (error) {
                console.error(error);
            }

            if (!user) {
                return { headers };
            }

            // If "Authorization" header is already set, don't overwrite it.
            if (headers && headers.Authorization) {
                return { headers };
            }

            const idToken = user.getIdToken().getJwtToken();
            return {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${idToken}`
                }
            };
        });
    });
};

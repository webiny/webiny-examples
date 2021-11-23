import * as aws from "@pulumi/aws";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils";
import Cloudfront from "./cloudfront";

class Cognito {
    userPoolClient: aws.cognito.UserPoolClient;
    constructor({ cloudfront }: { cloudfront: Cloudfront }) {
        const { cognitoUserPool } = getStackOutput({
            folder: "pinterest-clone/api",
            env: String(process.env.WEBINY_ENV),
        });

        // Allowed callback and logout URLs. We need localhost for development purposes,
        // and the Cloudfront distribution for the deployed application.
        const local = `http://localhost:3002`;
        const callbackUrls = [`${local}?signIn`, cloudfront.getDistributionUrl("?signIn")];
        const logoutUrls = [`${local}?signOut`, cloudfront.getDistributionUrl("?signOut")];

        // Creates a new user pool client, which we'll use in our React application.
        // https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpoolclient/
        // https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_CreateUserPoolClient.html
        this.userPoolClient = new aws.cognito.UserPoolClient("pinterest-clone", {
            userPoolId: cognitoUserPool.id,
            callbackUrls,
            logoutUrls,

            // A list of provider names for the identity providers that are supported on
            // this client. Supported values: COGNITO, Facebook, Google and LoginWithAmazon.
            supportedIdentityProviders: ["COGNITO"],

            // Enables usage of OAuth flows.
            allowedOauthFlowsUserPoolClient: true,
            allowedOauthFlows: ["implicit"],
            allowedOauthScopes: ["openid", "profile", "email"],
        });
    }
}

export default Cognito;

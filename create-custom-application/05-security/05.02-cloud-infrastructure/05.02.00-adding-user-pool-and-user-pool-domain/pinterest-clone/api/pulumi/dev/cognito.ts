import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const BASE_ATTRIBUTE_NAMES = ["email", "given_name", "family_name"];

class Cognito {
    userPool: aws.cognito.UserPool;
    userPoolDomain: aws.cognito.UserPoolDomain;
    constructor() {
        // Creates a new user pool. For more information on all of the available options, see:
        // https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpool/
        // https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_CreateUserPool.html
        this.userPool = new aws.cognito.UserPool("pinterest-clone", {
            schemas: BASE_ATTRIBUTE_NAMES.map(name => ({
                name,
                attributeDataType: "String",
                required: true,
                developerOnlyAttribute: false,
                mutable: true,
                stringAttributeConstraints: {
                    maxLength: "2048",
                    minLength: "0"
                }
            })),
            passwordPolicy: {
                minimumLength: 8,
                requireLowercase: false,
                requireNumbers: false,
                requireSymbols: false,
                requireUppercase: false,
                temporaryPasswordValidityDays: 7
            },
            autoVerifiedAttributes: ["email"],
            usernameAttributes: ["email"]
        });

        // Creates a user pool domain over which we'll be able to access the Hosted UI authentication flow.
        // For more information on all of the available options, see:
        // https://www.pulumi.com/docs/reference/pkg/aws/cognito/userpooldomain/
        // https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_CreateUserPoolDomain.html
        this.userPoolDomain = new aws.cognito.UserPoolDomain("pinterest-clone", {
            domain: `pinterest-clone-${process.env.WEBINY_ENV}`,
            userPoolId: this.userPool.id,
        });
    }

    // A simple getter that will construct and return us the complete user pool domain.
    getUserPoolDomain() {
        return pulumi.interpolate`${this.userPoolDomain.domain}.auth.${process.env.AWS_REGION}.amazoncognito.com`;
    }
}

export default Cognito;

import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import vpc from "./vpc";

interface GraphqlParams {
    env: Record<string, any>;
    dbTable: aws.dynamodb.Table;
}

class Graphql {
    functions: {
        api: aws.lambda.Function;
    };
    role: aws.iam.Role;

    constructor({ env, dbTable }: GraphqlParams) {
        this.role = new aws.iam.Role("pinterest-clone", {
            assumeRolePolicy: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "sts:AssumeRole",
                        Principal: {
                            Service: "lambda.amazonaws.com"
                        },
                        Effect: "Allow"
                    }
                ]
            }
        });

        const policy = new aws.iam.Policy("pinterest-clone", {
            description:
                "Pinterest Clone - enables the GraphQL API Lambda function to access AWS DynamoDB.",
            policy: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Sid: "PermissionForDynamodb",
                        Effect: "Allow",
                        Action: [
                            "dynamodb:BatchGetItem",
                            "dynamodb:BatchWriteItem",
                            "dynamodb:DeleteItem",
                            "dynamodb:GetItem",
                            "dynamodb:PutItem",
                            "dynamodb:Query",
                            "dynamodb:Scan",
                            "dynamodb:UpdateItem"
                        ],
                        Resource: [
                            pulumi.interpolate`${dbTable.arn}`,
                            pulumi.interpolate`${dbTable.arn}/*`
                        ]
                    }
                ]
            }
        });

        new aws.iam.RolePolicyAttachment(`pinterest-clone`, {
            role: this.role,
            policyArn: policy.arn.apply(arn => arn)
        });

        new aws.iam.RolePolicyAttachment(`pinterest-clone-execution`, {
            role: this.role,
            policyArn: aws.iam.ManagedPolicy.AWSLambdaVPCAccessExecutionRole
        });

        this.functions = {
            api: new aws.lambda.Function("pinterest-clone", {
                runtime: "nodejs12.x",
                handler: "handler.handler",
                description: "Pinterest Clone - GraphQL API Lambda function.",
                role: this.role.arn,
                timeout: 30,
                memorySize: 512,
                code: new pulumi.asset.AssetArchive({
                    ".": new pulumi.asset.FileArchive("../code/graphql/build")
                }),
                environment: {
                    variables: {
                        ...env,
                        // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html
                        AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1"
                    }
                },
                vpcConfig: {
                    subnetIds: vpc.subnets.private.map(subNet => subNet.id),
                    securityGroupIds: [vpc.vpc.defaultSecurityGroupId]
                }
            })
        };
    }
}

export default Graphql;

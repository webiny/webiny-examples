import { CorePulumiAppAdvancedVpcParams } from "@webiny/pulumi-aws/enterprise";

// Returns VPC configuration depending on the provided environment name.
export const getVpcConfiguration = (env: string): CorePulumiAppAdvancedVpcParams | undefined => {
    if (env === "staging") {
        const subnetIds = [
            "subnet-A",
            "subnet-B",
            "subnet-C"
        ];

        const securityGroupIds = ["sg-A"];
        return {
            useExistingVpc: {
                elasticSearchDomainVpcConfig: { subnetIds, securityGroupIds },
                lambdaFunctionsVpcConfig: { subnetIds, securityGroupIds }
            }
        };
    }

    if (env === "prod") {
        const subnetIds = [
            "subnet-X",
            "subnet-Y",
            "subnet-Z"
        ];

        const securityGroupIds = ["sg-X"];
        return {
            useExistingVpc: {
                elasticSearchDomainVpcConfig: { subnetIds, securityGroupIds },
                lambdaFunctionsVpcConfig: { subnetIds, securityGroupIds }
            }
        };
    }

    // For all other environments, we don't need to deploy into an existing VPC.
    return undefined;
};
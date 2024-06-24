import * as aws from "@pulumi/aws";
import { createCoreApp } from "@webiny/serverless-cms-aws";
import { isResourceOfType } from "@webiny/pulumi";

export default createCoreApp({
    openSearch: true,
    productionEnvironments: ["prod", "production", "staging"],
    pulumi: ({ onResource, env }) => {
        onResource(resource => {
            if (isResourceOfType(resource, aws.opensearch.Domain)) {
                if (env.isProduction) {
                    resource.config.clusterConfig(clusterConfig => {
                        return {
                            ...clusterConfig,
                            instanceType: "r6g.xlarge.elasticsearch",
                            instanceCount: 3,
                            zoneAwarenessEnabled: true,
                            zoneAwarenessConfig: {
                                availabilityZoneCount: 3
                            }
                        };
                    });
                }
            }
        });
    }
});

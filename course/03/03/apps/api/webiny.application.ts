import { createApiApp } from "@webiny/serverless-cms-aws";

export default createApiApp({
    pulumiResourceNamePrefix: "wby-",
    pulumi: ({ resources }) => {
        // Set memory size to 1024 MB.
        resources.graphql.functions.graphql.config.memorySize(1024);
    }
});
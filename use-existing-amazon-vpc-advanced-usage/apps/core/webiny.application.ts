import { createCoreApp } from "@webiny/serverless-cms-aws/enterprise";
import { getVpcConfiguration } from "pulumi";

export default createCoreApp({
    elasticSearch: true,
    pulumiResourceNamePrefix: "wby-",
    vpc: ({ params }) => {
        // https://www.webiny.com/docs/infrastructure/basics/modify-cloud-infrastructure#retrieving-the-deployment-environment
        const { env } = params.run;

        return getVpcConfiguration(env);
    }
});

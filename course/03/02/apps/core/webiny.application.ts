import { createCoreApp } from "@webiny/serverless-cms-aws";
import { applyTags } from "pulumi";

export default createCoreApp({
    pulumiResourceNamePrefix: "wby-",
    pulumi: () => {
        applyTags();
    }
});
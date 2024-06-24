import { createApiApp } from "@webiny/serverless-cms-aws";
import { applyTags } from "pulumi";

export default createApiApp({
    pulumiResourceNamePrefix: "wby-",
    pulumi: () => {
        applyTags();
    }
});

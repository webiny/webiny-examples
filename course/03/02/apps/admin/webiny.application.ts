import { createAdminApp } from "@webiny/serverless-cms-aws";
import { applyTags } from "pulumi";

export default createAdminApp({
    pulumiResourceNamePrefix: "wby-",
    pulumi: () => {
        applyTags();
    }
});

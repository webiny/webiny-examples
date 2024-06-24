import { createWebisteApp } from "@webiny/serverless-cms-aws";
import { applyTags } from "pulumi";

export default createWebisteApp({
    pulumiResourceNamePrefix: "wby-",
    pulumi: () => {
        applyTags();
    }
});

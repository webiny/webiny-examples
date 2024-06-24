import { tagResources } from "@webiny/pulumi-aws";

export const applyTags = () => {
    // We are assigning Owner and Contact tags, whose values
    // are read from runtime environment variables.
    tagResources({
        Owner: "Adrian",
        Contact: "adrian@webiny.com"
    });
};
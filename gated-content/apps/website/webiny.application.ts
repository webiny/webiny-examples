import { createWebsiteApp } from "@webiny/serverless-cms-aws";

export default createWebsiteApp({
    pulumiResourceNamePrefix: "wby-"
    // domains() {
    //     return {
    //         acmCertificateArn:
    //             "arn:aws:acm:us-east-1:656932293860:certificate/46f07a1c-841f-469a-a84b-ae716b5333b1",
    //         domains: ["*.cp.webiny.co.uk"],
    //         sslSupportMethod: "sni-only"
    //     };
    // }
});

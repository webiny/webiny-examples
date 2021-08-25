import * as aws from "@pulumi/aws";

class S3 {
    bucket: aws.s3.Bucket;
    constructor() {
        this.bucket = new aws.s3.Bucket("instagram-clone", {
            acl: "private",
            forceDestroy: true,
            corsRules: [
                {
                    allowedHeaders: ["*"],
                    allowedMethods: ["POST", "GET"],
                    allowedOrigins: ["*"],
                    maxAgeSeconds: 3000
                }
            ]
        });
    }
}

export default S3;

import uniqueId from "uniqid";
import sanitizeFilename from "sanitize-filename";
import S3 from "aws-sdk/clients/s3";

interface Params {
    file: Record<string, any>;
    folder?: string;
}

export default async ({ file, folder = "" }: Params) => {
    if (!file.type) {
        file.type = "application/octet-stream";
    }

    const type = file.type;

    // Sanitize file name and remove all whitespace with "-".
    const name = sanitizeFilename(file.name).replace(/\s/g, "-");
    const key = `${folder}/${uniqueId()}-${name}`;

    const s3 = new S3();
    const payload = s3.createPresignedPost({
        Expires: 60,
        Bucket: process.env.FILES_BUCKET,
        Conditions: [["content-length-range", 0, 26214400]], // 0 Bytes - 25MB
        Fields: {
            "Content-Type": type,
            acl: "public-read",
            key
        }
    });

    return {
        data: payload,
        file: {
            name,
            key,
            type,
            size: file.size
        }
    };
};

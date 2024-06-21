import { createFileUploadModifier } from "@webiny/api-file-manager-s3";

export const createExtension = () => {
    return [
        createFileUploadModifier(({ modifier }) => {
            modifier.setFile(file => {
                if (file.key.toLowerCase().endsWith("png")) {
                    return { ...file, key: `my-custom-key-${Date.now()}.png` };
                }

                return file;
            });
        })
    ];
};
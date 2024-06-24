import { createContextPlugin } from "@webiny/api-serverless-cms";

export const createExtension = () => {
    return [
        createContextPlugin(context => {
            context.fileManager.onFileBeforeCreate.subscribe(({ file }) => {
                file.aliases = [`/my-files/${file.name}`];
            });
        })
    ];
};
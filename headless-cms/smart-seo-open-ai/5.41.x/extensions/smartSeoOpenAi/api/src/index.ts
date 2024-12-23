import { Article } from "./Article"
import { generateSeo } from "./generateSeo";

export const createExtension = () => {
    return [
        Article,
        generateSeo
    ];
};

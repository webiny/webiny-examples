import { compareEntryRevisions } from "./compareEntryRevisions";

export const createExtension = () => {
    return [
        ...compareEntryRevisions()
    ];
};

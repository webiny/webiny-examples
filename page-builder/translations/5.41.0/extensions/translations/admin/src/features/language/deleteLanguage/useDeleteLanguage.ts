import { useCallback, useMemo } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { WebinyError } from "@webiny/error";
import { languageCache } from "../languageCache";
import { DeleteLanguageRepository } from "./DeleteLanguageRepository";
import { DeleteLanguageGqlGateway } from "./DeleteLanguageGqlGateway";

export const useDeleteLanguage = () => {
    const client = useApolloClient();

    const gateway = useMemo(() => {
        return new DeleteLanguageGqlGateway(client);
    }, [client]);

    const repository = useMemo(() => {
        return new DeleteLanguageRepository(gateway, languageCache);
    }, [gateway]);

    const deleteLanguage = useCallback(
        (code: string) => {
            const language = languageCache.getItem(item => item.code === code);
            if (!language) {
                return;
            }

            if (language.isBaseLanguage) {
                throw new WebinyError({
                    message: `You're not allowed to delete the base language!`,
                    code: "CANNOT_DELETE_BASE_LANGUAGE"
                });
            }

            return repository.deleteLanguage(language);
        },
        [repository]
    );

    return { deleteLanguage };
};

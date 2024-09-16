import { useCallback, useMemo } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { languageCache } from "../languageCache";
import { LanguageDto } from "./LanguageDto";
import { UpdateLanguageRepository } from "./UpdateLanguageRepository";
import { UpdateLanguageGqlGateway } from "./UpdateLanguageGqlGateway";

export const useUpdateLanguage = () => {
    const client = useApolloClient();

    const gateway = useMemo(() => {
        return new UpdateLanguageGqlGateway(client);
    }, [client]);

    const repository = useMemo(() => {
        return new UpdateLanguageRepository(gateway, languageCache);
    }, [gateway]);

    const updateLanguage = useCallback(
        (languageDto: LanguageDto) => {
            return repository.updateLanguage(languageDto);
        },
        [repository]
    );

    return { updateLanguage };
};

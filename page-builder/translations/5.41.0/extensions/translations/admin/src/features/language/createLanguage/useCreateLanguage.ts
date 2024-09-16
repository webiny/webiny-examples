import { useCallback, useMemo } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { languageCache } from "../languageCache";
import { CreateLanguageRepository } from "./CreateLanguageRepository";
import { CreateLanguageGqlGateway } from "./CreateLanguageGqlGateway";
import { LanguageDto } from "./LanguageDto";

export const useCreateLanguage = () => {
    const client = useApolloClient();

    const gateway = useMemo(() => {
        return new CreateLanguageGqlGateway(client);
    }, [client]);

    const repository = useMemo(() => {
        return new CreateLanguageRepository(gateway, languageCache);
    }, [gateway]);

    const createLanguage = useCallback(
        (languageDto: LanguageDto) => {
            return repository.createLanguage(languageDto);
        },
        [repository]
    );

    return { createLanguage };
};

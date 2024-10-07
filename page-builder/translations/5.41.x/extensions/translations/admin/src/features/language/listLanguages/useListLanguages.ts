import { useEffect, useMemo, useState } from "react";
import { autorun, toJS } from "mobx";
import ApolloClient from "apollo-client";
import { useApolloClient } from "@apollo/react-hooks";
import type { Language } from "../Language";
import type { IListLanguagesRepository } from "./IListLanguagesRepository";
import { languageCache } from "../languageCache";
import { ListLanguagesGqlGateway } from "./ListLanguagesGqlGateway";
import { ListLanguagesRepository } from "./ListLanguagesRepository";

class RepositoryFactory {
    private cache: Map<ApolloClient<any>, IListLanguagesRepository> = new Map();

    get(client: ApolloClient<any>): IListLanguagesRepository {
        if (!this.cache.has(client)) {
            const gateway = new ListLanguagesGqlGateway(client);
            const repository = new ListLanguagesRepository(gateway, languageCache);
            this.cache.set(client, repository);
        }

        return this.cache.get(client) as IListLanguagesRepository;
    }
}

const repositoryFactory = new RepositoryFactory();

export const useListLanguages = () => {
    const client = useApolloClient();
    const [vm, setVm] = useState<{ loading: boolean; languages: Language[] }>({
        loading: true,
        languages: []
    });

    const repository = useMemo(() => {
        return repositoryFactory.get(client);
    }, []);

    useEffect(() => {
        repository.execute();
    }, []);

    useEffect(() => {
        autorun(() => {
            const loading = repository.getLoading();
            const languages = repository.getLanguages();
            setVm({ loading, languages: languages.map(lang => toJS(lang)) });
        });
    }, [repository]);

    return vm;
};

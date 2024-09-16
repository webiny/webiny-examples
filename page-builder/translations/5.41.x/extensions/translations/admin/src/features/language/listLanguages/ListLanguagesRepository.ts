import { makeAutoObservable, runInAction } from "mobx";
import type { IListCache } from "@webiny/app-page-builder/translations";
import type { Language } from "../Language";
import { IListLanguagesRepository } from "./IListLanguagesRepository";
import { IListLanguagesGateway } from "./IListLanguagesGateway";
import { LanguageDto } from "./LanguageDto";

export class ListLanguagesRepository implements IListLanguagesRepository {
    private readonly cache: IListCache<Language>;
    private readonly gateway: IListLanguagesGateway;
    private loading: boolean;
    private loader: Promise<Language[]> | undefined = undefined;

    constructor(gateway: IListLanguagesGateway, cache: IListCache<Language>) {
        this.gateway = gateway;
        this.cache = cache;
        this.loading = false;
        makeAutoObservable(this);
    }

    getLoading() {
        return this.loading;
    }

    getLanguages() {
        return this.cache.getItems();
    }

    async execute() {
        if (this.cache.hasItems()) {
            return this.cache.getItems();
        }

        if (this.loader) {
            return this.loader;
        }

        this.loader = (async () => {
            this.loading = true;

            let languageDtos: LanguageDto[] = [];

            try {
                languageDtos = await this.gateway.execute();
            } catch (err) {
                console.error(err);
            } finally {
                runInAction(() => {
                    this.loading = false;
                });
            }

            runInAction(() => {
                this.cache.addItems(
                    languageDtos.map(dto => {
                        return {
                            code: dto.code,
                            name: dto.name,
                            direction: dto.direction,
                            isBaseLanguage: dto.isBaseLanguage
                        };
                    })
                );
            });

            this.loader = undefined;

            return languageDtos;
        })();

        return this.loader;
    }
}

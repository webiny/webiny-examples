import { makeAutoObservable } from "mobx";
import type { Language } from "../Language";
import type { IListCache } from "@webiny/app-page-builder/translations";
import { IDeleteLanguageGateway } from "./IDeleteLanguageGateway";
import { IDeleteLanguageRepository } from "./IDeleteLanguageRepository";

export class DeleteLanguageRepository implements IDeleteLanguageRepository {
    private readonly cache: IListCache<Language>;
    private readonly gateway: IDeleteLanguageGateway;

    constructor(gateway: IDeleteLanguageGateway, cache: IListCache<Language>) {
        this.gateway = gateway;
        this.cache = cache;
        makeAutoObservable(this);
    }

    async deleteLanguage(language: Language) {
        await this.gateway.execute(language.code);

        this.cache.removeItems(item => item.code === language.code);
    }
}

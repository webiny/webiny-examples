import { makeAutoObservable } from "mobx";
import type { IListCache } from "@webiny/app-page-builder/translations";
import type { Language } from "../Language";
import { ICreateLanguageRepository } from "./ICreateLanguageRepository";
import { ICreateLanguageGateway } from "./ICreateLanguageGateway";
import type { LanguageDto } from "./LanguageDto";

export class CreateLanguageRepository implements ICreateLanguageRepository {
    private readonly cache: IListCache<Language>;
    private readonly gateway: ICreateLanguageGateway;

    constructor(gateway: ICreateLanguageGateway, cache: IListCache<Language>) {
        this.gateway = gateway;
        this.cache = cache;
        makeAutoObservable(this);
    }

    async createLanguage(language: Language) {
        const dto: LanguageDto = {
            code: language.code,
            name: language.name,
            direction: language.direction ?? "ltr",
            isBaseLanguage: language.isBaseLanguage ?? false
        };

        if (this.cache.getItem(item => item.code === dto.code)) {
            throw new Error(`Language with code "${dto.code}" already exists!`);
        }

        await this.gateway.execute(dto);

        this.cache.addItems([language]);
    }
}

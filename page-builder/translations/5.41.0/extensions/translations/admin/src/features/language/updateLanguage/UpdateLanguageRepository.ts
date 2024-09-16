import { makeAutoObservable } from "mobx";
import type { Language } from "../Language";
import type { IListCache } from "@webiny/app-page-builder/translations";
import { IUpdateLanguageRepository } from "./IUpdateLanguageRepository";
import { IUpdateLanguageGateway } from "./IUpdateLanguageGateway";
import { LanguageDto } from "./LanguageDto";

export class UpdateLanguageRepository implements IUpdateLanguageRepository {
    private readonly cache: IListCache<Language>;
    private readonly gateway: IUpdateLanguageGateway;

    constructor(gateway: IUpdateLanguageGateway, cache: IListCache<Language>) {
        this.gateway = gateway;
        this.cache = cache;
        makeAutoObservable(this);
    }

    async updateLanguage(language: Language) {
        const dto: LanguageDto = {
            code: language.code,
            name: language.name,
            direction: language.direction,
            isBaseLanguage: language.isBaseLanguage
        };

        await this.gateway.execute(dto);

        this.cache.updateItems(item => {
            if (item.code === language.code) {
                return dto;
            }
            return item;
        });
    }
}

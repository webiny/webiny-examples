import { WebinyError } from "@webiny/error";
import type { Language } from "../domain/Language";
import type { CmsLanguageDTO } from "./CmsLanguageDTO";
import { Context } from "../../types";
import { GetModel } from "./GetModel";

export class UpdateLanguageRepository {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(language: Language): Promise<void> {
        const model = await GetModel.byModelId(this.context, "translationLanguage");
        const [[entry]] = await this.context.cms.listLatestEntries<CmsLanguageDTO>(model, {
            where: {
                code: language.getCode()
            },
            limit: 1
        });

        if (!entry) {
            throw new WebinyError({
                code: "LANGUAGE_DOES_NOT_EXIST",
                message: `Language with code "${language.getCode()}" doesn't exist!`
            });
        }

        await this.context.cms.updateEntry<Partial<CmsLanguageDTO>>(model, entry.id, {
            name: language.getName(),
            direction: language.getDirection(),
            baseLanguage: language.isBaseLanguage()
        });
    }
}

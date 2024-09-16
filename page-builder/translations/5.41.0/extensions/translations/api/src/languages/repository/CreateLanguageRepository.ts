import { WebinyError } from "@webiny/error";
import { Context } from "../../types";
import { GetModel } from "./GetModel";
import type { Language } from "../domain/Language";
import type { CmsLanguageDTO } from "./CmsLanguageDTO";

export class CreateLanguageRepository {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(language: Language): Promise<void> {
        const model = await GetModel.byModelId(this.context, "translationLanguage");
        const [exists] = await this.context.cms.listLatestEntries<CmsLanguageDTO>(model, {
            where: {
                code: language.getCode()
            },
            limit: 1
        });

        if (exists.length > 0) {
            throw new WebinyError({
                code: "LANGUAGE_EXISTS",
                message: `Language with code "${language.getCode()}" already exists!`
            });
        }

        await this.context.cms.createEntry(model, {
            name: language.getName(),
            code: language.getCode(),
            direction: language.getDirection(),
            isBaseLanguage: language.isBaseLanguage()
        });
    }
}

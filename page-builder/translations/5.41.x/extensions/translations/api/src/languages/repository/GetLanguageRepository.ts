import { Context } from "../../types";
import type { Language } from "../domain/Language";
import type { CmsLanguageDTO } from "./CmsLanguageDTO";
import { GetModel } from "./GetModel";
import { CmsLanguageMapper } from "./CmsLanguageMapper";

export class GetLanguageRepository {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(code: string): Promise<Language | undefined> {
        const model = await GetModel.byModelId(this.context, "translationLanguage");
        const [[entry]] = await this.context.cms.listLatestEntries<CmsLanguageDTO>(model, {
            where: { code },
            limit: 1
        });

        if (!entry) {
            return undefined;
        }

        return CmsLanguageMapper.fromDTO(entry.values);
    }
}

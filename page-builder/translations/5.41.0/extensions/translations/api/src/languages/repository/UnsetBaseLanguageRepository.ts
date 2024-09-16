import { Context } from "../../types";
import type { CmsLanguageDTO } from "./CmsLanguageDTO";
import { GetModel } from "./GetModel";

export class UnsetBaseLanguageRepository {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute() {
        const model = await GetModel.byModelId(this.context, "translationLanguage");

        const [baseLanguages] = await this.context.cms.listLatestEntries<CmsLanguageDTO>(model, {
            where: {
                baseLanguage: true
            }
        });

        await Promise.all(
            baseLanguages.map(language => {
                this.context.cms.updateEntry(model, language.id, {
                    isBaseLanguage: false
                });
            })
        );
    }
}

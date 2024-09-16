import type { Context } from "../../types";
import type { Language } from "../domain/Language";
import type { CmsLanguageDTO } from "./CmsLanguageDTO";
import { GetModel } from "./GetModel";
import { CmsLanguageMapper } from "./CmsLanguageMapper";

export class ListLanguagesRepository {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(): Promise<Language[]> {
        return this.context.security.withoutAuthorization(async () => {
            // TODO: move "Language" model to a private code model.
            const model = await GetModel.byModelId(this.context, "translationLanguage");
            const [languages] = await this.context.cms.listLatestEntries<CmsLanguageDTO>(model, {
                limit: 1000
            });

            return languages.map(entry => CmsLanguageMapper.fromDTO(entry.values));
        });
    }
}

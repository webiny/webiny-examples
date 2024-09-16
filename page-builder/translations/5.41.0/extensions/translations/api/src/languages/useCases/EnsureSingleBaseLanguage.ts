import { Context } from "../../types";
import { ListLanguagesUseCase } from "./ListLanguagesUseCase";
import { UpdateLanguageRepository } from "../repository/UpdateLanguageRepository";

export class EnsureSingleBaseLanguage {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(baseLanguageCode: string): Promise<void> {
        const listLanguages = new ListLanguagesUseCase(this.context);
        const updateLanguageRepository = new UpdateLanguageRepository(this.context);

        const languages = await listLanguages.execute();

        await Promise.all(
            languages
                // Find all base languages. Under normal circumstances, there should only be one.
                .filter(lang => {
                    return lang.isBaseLanguage() && lang.getCode() !== baseLanguageCode;
                })
                .map(language => {
                    return updateLanguageRepository.execute(
                        language.update({ isBaseLanguage: false })
                    );
                })
        );
    }
}

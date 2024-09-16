import type { Language } from "../Language";

export interface IUpdateLanguageRepository {
    updateLanguage(language: Language): Promise<void>;
}

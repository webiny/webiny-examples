import type { Language } from "../Language";

export interface ICreateLanguageRepository {
    createLanguage(language: Language): Promise<void>;
}

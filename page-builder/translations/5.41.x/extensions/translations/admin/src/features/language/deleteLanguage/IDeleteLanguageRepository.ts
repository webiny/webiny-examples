import type { Language } from "../Language";

export interface IDeleteLanguageRepository {
    deleteLanguage(language: Language): Promise<void>;
}

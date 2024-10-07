import type { LanguageDto } from "./LanguageDto";

export interface ICreateLanguageGateway {
    execute(languageDto: LanguageDto): Promise<void>;
}

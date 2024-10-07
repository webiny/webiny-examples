import { LanguageDto } from "./LanguageDto";

export interface IUpdateLanguageGateway {
    execute(languageDto: LanguageDto): Promise<void>;
}

import type { Language } from "../domain/Language";
import type { GqlLanguageDTO } from "./GqlLanguageDTO";

export class GqlLanguageMapper {
    static toDTO(language: Language): GqlLanguageDTO {
        return {
            name: language.getName(),
            code: language.getCode(),
            direction: language.getDirection(),
            isBaseLanguage: language.isBaseLanguage()
        };
    }
}

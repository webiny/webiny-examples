export interface LanguageDto {
    name: string;
    code: string;
    direction: "ltr" | "rtl";
    isBaseLanguage: boolean;
}

export interface IListLanguagesGateway {
    execute(): Promise<LanguageDto[]>;
}

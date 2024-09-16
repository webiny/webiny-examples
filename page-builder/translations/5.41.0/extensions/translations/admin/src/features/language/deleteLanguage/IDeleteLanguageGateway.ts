export interface IDeleteLanguageGateway {
    execute(code: string): Promise<void>;
}

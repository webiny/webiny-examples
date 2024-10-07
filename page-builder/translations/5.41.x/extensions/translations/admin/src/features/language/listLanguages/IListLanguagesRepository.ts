import { Language } from "../Language";

export interface IListLanguagesRepository {
    getLoading(): boolean;
    getLanguages(): Language[];
    execute(): Promise<Language[]>;
}

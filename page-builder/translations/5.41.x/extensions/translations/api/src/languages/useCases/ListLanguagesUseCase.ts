import type { Context } from "../../types";
import type { Language } from "../domain/Language";
import { ListLanguagesRepository } from "../repository/ListLanguagesRepository";

export class ListLanguagesUseCase {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(): Promise<Language[]> {
        const repository = new ListLanguagesRepository(this.context);
        return repository.execute();
    }
}

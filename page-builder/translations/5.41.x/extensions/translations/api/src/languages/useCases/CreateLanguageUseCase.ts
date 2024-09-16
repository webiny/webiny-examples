import type { Context } from "../../types";
import { Language } from "../domain/Language";
import { CreateLanguageRepository } from "../repository/CreateLanguageRepository";
import { EnsureSingleBaseLanguage } from "./EnsureSingleBaseLanguage";

interface CreateLanguageParams {
    language: {
        name: string;
        code: string;
        direction: "ltr" | "rtl";
        isBaseLanguage: boolean;
    };
}

export class CreateLanguageUseCase {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(params: CreateLanguageParams): Promise<Language> {
        const newLanguage = Language.create(params.language);

        const createRepository = new CreateLanguageRepository(this.context);
        await createRepository.execute(newLanguage);

        if (newLanguage.isBaseLanguage()) {
            const ensureSingleBaseLanguage = new EnsureSingleBaseLanguage(this.context);
            await ensureSingleBaseLanguage.execute(newLanguage.getCode());
        }

        return newLanguage;
    }
}

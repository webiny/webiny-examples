import { WebinyError } from "@webiny/error";
import type { Context } from "../../types";
import { Language } from "../domain/Language";
import { UpdateLanguageRepository } from "../repository/UpdateLanguageRepository";
import { EnsureSingleBaseLanguage } from "./EnsureSingleBaseLanguage";
import { GetLanguageRepository } from "../repository/GetLanguageRepository";

interface UpdateLanguageParams {
    language: {
        code: string;
        name?: string;
        direction?: "ltr" | "rtl";
        isBaseLanguage?: boolean;
    };
}

export class UpdateLanguageUseCase {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(params: UpdateLanguageParams): Promise<Language> {
        const { code, ...data } = params.language;

        const getLanguage = new GetLanguageRepository(this.context);
        const language = await getLanguage.execute(code);

        if (!language) {
            throw new WebinyError({
                code: "NOT_FOUND",
                message: `Language with code "${params.language.code} was not found!"`
            });
        }

        const updatedLanguage = language.update(data);

        const updateLanguageRepository = new UpdateLanguageRepository(this.context);
        await updateLanguageRepository.execute(updatedLanguage);

        if (updatedLanguage.isBaseLanguage()) {
            const ensureSingleBaseLanguage = new EnsureSingleBaseLanguage(this.context);
            await ensureSingleBaseLanguage.execute(updatedLanguage.getCode());
        }

        return updatedLanguage;
    }
}

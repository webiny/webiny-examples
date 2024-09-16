import { WebinyError } from "@webiny/error";
import type { Context } from "../../types";
import { GetLanguageRepository } from "../repository/GetLanguageRepository";
import { DeleteLanguageRepository } from "../repository/DeleteLanguageRepository";

interface DeleteLanguageParams {
    language: {
        code: string;
    };
}

export class DeleteLanguageUseCase {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(params: DeleteLanguageParams): Promise<void> {
        const { code } = params.language;

        const getLanguage = new GetLanguageRepository(this.context);
        const language = await getLanguage.execute(code);

        if (!language) {
            throw new WebinyError({
                code: "NOT_FOUND",
                message: `Language with code "${params.language.code} was not found!"`
            });
        }

        const deleteLanguageRepository = new DeleteLanguageRepository(this.context);
        await deleteLanguageRepository.execute(language);
    }
}

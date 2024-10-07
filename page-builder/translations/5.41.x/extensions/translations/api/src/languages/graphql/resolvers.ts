import { Context } from "../../types";
import { ErrorResponse, Response } from "@webiny/handler-graphql";
import { Resolvers } from "@webiny/handler-graphql/types";
import { GqlLanguageMapper } from "./GqlLanguageMapper";
import { ListLanguagesUseCase } from "../useCases/ListLanguagesUseCase";
import { CreateLanguageUseCase } from "../useCases/CreateLanguageUseCase";
import { UpdateLanguageUseCase } from "../useCases/UpdateLanguageUseCase";
import { DeleteLanguageUseCase } from "../useCases/DeleteLanguageUseCase";

interface CreateLanguageParams {
    data: {
        code: string;
        name: string;
        direction: "ltr" | "rtl";
        isBaseLanguage: boolean;
    };
}

interface UpdateLanguageParams {
    code: string;
    data: {
        name?: string;
        direction?: "ltr" | "rtl";
        isBaseLanguage?: boolean;
    };
}

interface DeleteLanguageParams {
    code: string;
}

export const languageResolvers: Resolvers<Context> = {
    TranslationsQuery: {
        listLanguages: async (_, __, context) => {
            try {
                const repository = new ListLanguagesUseCase(context);
                const languages = await repository.execute();

                return new Response(languages.map(language => GqlLanguageMapper.toDTO(language)));
            } catch (err) {
                return new ErrorResponse(err);
            }
        }
    },
    TranslationsMutation: {
        createLanguage: async (_, args, context) => {
            const { data } = args as CreateLanguageParams;
            try {
                const repository = new CreateLanguageUseCase(context);
                const language = await repository.execute({ language: data });

                return new Response(GqlLanguageMapper.toDTO(language));
            } catch (err) {
                return new ErrorResponse(err);
            }
        },
        updateLanguage: async (_, args, context) => {
            const { code, data } = args as UpdateLanguageParams;
            try {
                const update = new UpdateLanguageUseCase(context);
                const updatedLanguage = await update.execute({ language: { code, ...data } });

                return new Response(GqlLanguageMapper.toDTO(updatedLanguage));
            } catch (err) {
                return new ErrorResponse(err);
            }
        },
        deleteLanguage: async (_, args, context) => {
            const { code } = args as DeleteLanguageParams;
            try {
                const deleteLanguage = new DeleteLanguageUseCase(context);
                await deleteLanguage.execute({ language: { code } });

                return new Response(true);
            } catch (err) {
                return new ErrorResponse(err);
            }
        }
    }
};

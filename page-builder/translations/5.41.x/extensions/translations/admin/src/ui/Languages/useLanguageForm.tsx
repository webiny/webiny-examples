import { useCallback } from "react";
import { useRouter } from "@webiny/react-router";
import { useSnackbar } from "@webiny/app-admin";
import { useLanguageNavigate } from "./useLanguageNavigate";
import { Language, useCreateLanguage, useListLanguages, useUpdateLanguage } from "../../features";

export const useLanguageForm = () => {
    const { navigateToEditLanguage } = useLanguageNavigate();
    const { location } = useRouter();
    const { showSnackbar } = useSnackbar();
    const { createLanguage } = useCreateLanguage();
    const { updateLanguage } = useUpdateLanguage();
    const search = new URLSearchParams(location.search);

    const newEntry = search.get("new") === "true";
    const code = search.get("code");

    const { loading, languages } = useListLanguages();
    const language = languages.find(lang => lang.code === code);

    const onCreate = useCallback(async (language: Language) => {
        await createLanguage(language);
        navigateToEditLanguage(language);
        showSnackbar("A new language was created successfully!");
    }, []);

    const onUpdate = async (language: Language) => {
        await updateLanguage(language);
        showSnackbar(`${language.name} language was updated successfully!`);
    };

    const onSubmit = (formData: Language) => {
        const isUpdate = Boolean(code);
        return isUpdate ? onUpdate(formData) : onCreate(formData);
    };

    const showEmptyView = !newEntry && !loading && !language;

    return { onSubmit, showEmptyView, language: language ?? {}, loading, newEntry };
};

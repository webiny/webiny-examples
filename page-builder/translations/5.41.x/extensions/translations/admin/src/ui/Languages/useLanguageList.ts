import { useCallback, useState } from "react";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import { useLanguageNavigate } from "./useLanguageNavigate";
import { useListLanguages, useDeleteLanguage, Language } from "../../features";

export const useLanguageList = () => {
    const { showSnackbar } = useSnackbar();
    const { showConfirmation } = useConfirmationDialog();
    const { navigateToLanguageList } = useLanguageNavigate();
    const { loading, languages } = useListLanguages();
    const { deleteLanguage } = useDeleteLanguage();
    const [filter, setFilter] = useState("");

    const code = new URLSearchParams(location.search).get("code");

    const deleteItem = useCallback(
        (item: Language) => {
            showConfirmation(async () => {
                await deleteLanguage(item.code);
                showSnackbar(`Language "${item.code}" was deleted successfully!`);

                if (code === item.code) {
                    navigateToLanguageList();
                }
            });
        },
        [code]
    );

    return {
        activeLanguageCode: code,
        loading,
        languages:
            filter.trim().length > 0
                ? languages.filter(lang => lang.name.toLowerCase().includes(filter.toLowerCase()))
                : languages,
        deleteLanguage: deleteItem,
        filter,
        setFilter
    };
};

import { useLocation } from "@webiny/react-router";
import { useLanguages } from "./LanguagesContext";

/**
 * Parse pathname and detect the requested language.
 * If no language is specified in the pathname, fall back to the base language.
 */
export const useCurrentLanguage = () => {
    const { languages } = useLanguages();
    const location = useLocation();

    const baseLanguage = languages.find(language => language.isBaseLanguage)!;
    const language = languages.find(lang => location.pathname.startsWith(`/${lang.code}/`));

    return language ?? baseLanguage;
};

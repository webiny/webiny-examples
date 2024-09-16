import { Language } from "./Language";
import { useCurrentLanguage } from "./useCurrentLanguage";

export const useTranslatedPathname = () => {
    const currentLanguage = useCurrentLanguage();

    const createPathname = (pathname: string, language: Language) => {
        // Just in case it's there, remove the current language code prefix.
        const basePathname = pathname.replace(`/${currentLanguage.code}/`, `/`);
        // Prepend the requested language code.
        return `/${language.code}${basePathname}`;
    };

    return { createPathname };
};

import { useRouter } from "@webiny/react-router";
import { Language } from "../../features";

export const useLanguageNavigate = () => {
    const { history } = useRouter();

    const navigateToLanguageList = () => {
        history.push("/page-builder/languages");
    };

    const navigateToCreateLanguage = () => {
        history.push("/page-builder/languages?new=true");
    };

    const navigateToEditLanguage = (language: Language) => {
        history.push(`/page-builder/languages?code=${language.code}`);
    };

    return {
        navigateToCreateLanguage,
        navigateToEditLanguage,
        navigateToLanguageList
    };
};

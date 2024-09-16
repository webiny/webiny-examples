import { createGenericContext } from "@webiny/app";
import { Language } from "./Language";

const { useHook, Provider } = createGenericContext<{ languages: Language[] }>("LanguageContext");

export const useLanguages = useHook;
export const LanguagesProvider = Provider;

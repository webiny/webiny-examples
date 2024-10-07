import React from "react";
import { Select } from "@webiny/ui/Select";
import { Language } from "../../../features";

interface LanguageSelectorProps {
    value: Language;
    onChange: (value: Language) => void;
    languages: Language[];
}

export const LanguageSelector = ({ value, languages, onChange }: LanguageSelectorProps) => {
    const onSelect = (code: string) => {
        onChange(languages.find(lang => lang.code === code)!);
    };

    const options = languages.map(lang => ({
        value: lang.code,
        label: lang.name
    }));

    return <Select size={"medium"} onChange={onSelect} options={options} value={value.code} />;
};

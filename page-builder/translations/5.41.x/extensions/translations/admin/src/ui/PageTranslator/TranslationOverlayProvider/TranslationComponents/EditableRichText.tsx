import React from "react";
import { CompositionScope } from "@webiny/app-admin";
import { LexicalEditor } from "@webiny/lexical-editor-pb-element";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange";

interface EditableRichTextProps {
    type: "heading" | "paragraph";
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const EditableRichText = ({ type, value, onChange, placeholder }: EditableRichTextProps) => {
    return (
        <CompositionScope name={`pb.${type}`}>
            <DelayedOnChange value={value} onChange={onChange}>
                {({ value, onChange }) => (
                    <LexicalEditor
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                )}
            </DelayedOnChange>
        </CompositionScope>
    );
};

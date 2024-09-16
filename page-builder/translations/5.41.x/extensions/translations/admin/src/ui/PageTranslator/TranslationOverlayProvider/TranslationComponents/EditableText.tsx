import React from "react";
import styled from "@emotion/styled";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange";

const Input = styled.input`
    border: none;
    font-family: "IBM Plex Sans", sans-serif;
    color: #0a0a0a;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    :active,
    :focus {
        outline: none;
    }
`;

interface EditableTextProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export const EditableText = ({ value, onChange, placeholder }: EditableTextProps) => {
    return (
        <DelayedOnChange value={value || ""} onChange={onChange}>
            {({ value, onChange }) => (
                <Input
                    type={"text"}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            )}
        </DelayedOnChange>
    );
};

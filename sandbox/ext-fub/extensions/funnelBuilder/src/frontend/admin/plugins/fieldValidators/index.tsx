import React from "react";
import { RequiredFieldValidatorPlugin } from "./RequiredFieldValidatorPlugin";
import { MinLengthFieldValidatorPlugin } from "./MinLengthFieldValidatorPlugin";
import { MaxLengthFieldValidatorPlugin } from "./MaxLengthFieldValidatorPlugin";
import { LteFieldValidatorPlugin } from "./LteLengthFieldValidatorPlugin";
import { GteFieldValidatorPlugin } from "./GteLengthFieldValidatorPlugin";
import { PatternFieldValidatorPlugin } from "./PatternFieldValidatorPlugin";

export const FieldValidatorPlugins = () => {
    return (
        <>
            <RequiredFieldValidatorPlugin />
            <MinLengthFieldValidatorPlugin />
            <MaxLengthFieldValidatorPlugin />
            <LteFieldValidatorPlugin />
            <GteFieldValidatorPlugin />
            <PatternFieldValidatorPlugin />
        </>
    );
};

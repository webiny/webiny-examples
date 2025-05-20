import React from "react";
import { PbEditorFunnelFieldValidatorPlugin } from "../PbEditorFunnelFieldValidatorPlugin";

export const RequiredFieldValidatorPlugin = () => (
    <PbEditorFunnelFieldValidatorPlugin
        validatorType={"required"}
        label={"Required"}
        description={"You won't be able to submit the form if this field is empty"}
    />
);

import React from "react";
import {
    PbEditorFunnelFieldValidatorPlugin,
    RenderSettings
} from "../PbEditorFunnelFieldValidatorPlugin";
import { Cell, Grid } from "@webiny/ui/Grid";
import { validation } from "@webiny/validation";
import { Input } from "@webiny/ui/Input";
import { Bind, useForm } from "@webiny/form";
import { Select } from "@webiny/ui/Select";
import { patternPresets } from "./PatternFieldValidatorPlugin/patternPresets";

const ValidatorSettings: RenderSettings = ({ setMessage }) => {
    const { setValue, data } = useForm();
    const inputsDisabled = data.params.extra.preset !== "custom";

    const selectOptions: any = patternPresets.map(pattern => (
        <option key={pattern.type} value={pattern.type}>
            {pattern.name}
        </option>
    ));

    return (
        <Grid>
            <Cell span={3}>
                <Bind
                    name={"params.extra.preset"}
                    validators={validation.create("required")}
                    afterChange={value => {
                        if (value === "custom") {
                            setMessage("Invalid value.");
                            return;
                        }

                        setValue("params.extra.regex", null);
                        setValue("params.extra.flags", null);

                        const selectedPreset = patternPresets.find(preset => preset.type === value);

                        if (!selectedPreset) {
                            return;
                        }

                        setMessage(selectedPreset.defaultErrorMessage);
                    }}
                >
                    <Select label={"Preset"}>
                        <option value={"custom"}>Custom</option>
                        {selectOptions}
                    </Select>
                </Bind>
            </Cell>
            <Cell span={7}>
                <Bind name={"params.extra.regex"} validators={validation.create("required")}>
                    <Input
                        disabled={inputsDisabled}
                        label={"Regex"}
                        description={"Regex to test the value"}
                    />
                </Bind>
            </Cell>
            <Cell span={2}>
                <Bind name={"params.extra.flags"} validators={validation.create("required")}>
                    <Input disabled={inputsDisabled} label={"Flags"} description={"Regex flags"} />
                </Bind>
            </Cell>
        </Grid>
    );
};

export const PatternFieldValidatorPlugin = () => (
    <PbEditorFunnelFieldValidatorPlugin
        validatorType={"pattern"}
        label={"Pattern"}
        description={"Entered value must match a specific pattern."}
        settingsRenderer={ValidatorSettings}
    />
);

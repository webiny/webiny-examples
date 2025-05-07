import { createElementType } from "../../../shared/constants";

export const ELEMENT_TYPE = createElementType("button");

export const BUTTON_ACTION_OPTIONS: Array<{ id: string; label: string }> = [
    { id: "previousStep", label: "Previous step" },
    { id: "submit", label: "Submit" }
];

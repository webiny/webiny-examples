import { ButtonActionDefinition } from "../types";
import { nextStepButtonAction } from "./nextStepButtonAction";
import { previousStepButtonAction } from "./previousStepButtonAction";
import { saveUserToCrmButtonAction } from "./saveUserToCrmButtonAction";
import { validateStepButtonAction } from "./validateStepButtonAction";

export const registry: ButtonActionDefinition[] = [
    previousStepButtonAction,
    nextStepButtonAction,
    saveUserToCrmButtonAction,
    validateStepButtonAction
];

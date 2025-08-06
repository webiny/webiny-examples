import { ButtonActionDefinition } from "../types";

export const validateStepButtonAction: ButtonActionDefinition = {
    type: "validateStep",
    name: "Validate fields on current page",
    description:
        "Validates all fields on the current page. If valid, moves to the next action in the chain.",
    canAdd: ({ element }) => {
        // Can only be added if there are no "saveUserToCrm" actions already present.
        const actions = element.data.actions;
        return !actions.some(action => action.type === "validateStep");
    },
    action: async ({ form }) => {
        const isValid = await form.validate();

        // If valid, we want to move on with the next action. Otherwise, we stop the action chain.
        return isValid;
    }
};

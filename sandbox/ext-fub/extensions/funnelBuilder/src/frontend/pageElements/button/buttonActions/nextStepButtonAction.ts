import { ButtonActionDefinition } from "../types";

export const nextStepButtonAction: ButtonActionDefinition = {
    type: "nextStep",
    name: "Next Step",
    updateButtonLabel: "Next step",
    description:
        "Moves to the next step in the funnel. Cannot be added twice or together with the previous step action.",
    canAdd: ({ element }) => {
        // Can only be added if there are no "nextStep" or "previousStep" actions already present.
        const actions = element.data.actions;
        return (
            !actions.some(action => action.type === "nextStep") &&
            !actions.some(action => action.type === "previousStep")
        );
    },
    action: async ({ form }) => {
        const isValid = await form.validate();
        if (!isValid) {
            return false;
        }

        await form.submit();
        return true;
    }
};

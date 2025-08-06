import { ButtonActionDefinition } from "../types";

export const previousStepButtonAction: ButtonActionDefinition = {
    type: "previousStep",
    name: "Previous Step",
    updateButtonLabel: "Previous step",
    description:
        "Moves to the next step in the funnel. Cannot be added twice or together with thea next step action.",
    canAdd: ({ element }) => {
        // Can only be added if there are no "nextStep" or "previousStep" actions already present.
        const actions = element.data.actions;
        return (
            !actions.some(action => action.type === "nextStep") &&
            !actions.some(action => action.type === "previousStep")
        );
    },
    action: ({ funnelSubmissionVm }) => {
        funnelSubmissionVm.activatePreviousStep();
        return true;
    }
};

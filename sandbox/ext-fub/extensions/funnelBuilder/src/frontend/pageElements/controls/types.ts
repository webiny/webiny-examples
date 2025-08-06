export type ControlsAction = "previousStep" | "nextStep" | "submit";

export interface ControlsElementData {
    action: ControlsAction;
}

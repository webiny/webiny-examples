import { PbEditorElement } from "@webiny/app-page-builder/types";

export interface StepElementData {
    stepId: string;
}

export interface StepElement extends PbEditorElement {
    data: StepElementData;
}

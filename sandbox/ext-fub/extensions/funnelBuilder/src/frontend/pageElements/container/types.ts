import { PbEditorElement } from "@webiny/app-page-builder/types";
import { FunnelModelDto } from "../../../shared/models/FunnelModel";

export interface PbEditorElementWithChildren extends PbEditorElement {
    elements: PbEditorElement[];
}

export interface StepElement extends PbEditorElement {
    data: {
        stepId: string;
    };
}

export interface StepElementWithChildren extends PbEditorElement {
    data: {
        stepId: string;
    };
    elements: PbEditorElementWithChildren[];
}

export interface ContainerElement extends PbEditorElement {
    data: FunnelModelDto;
    elements: StepElement[];
}

export interface ContainerElementWithChildren extends ContainerElement {
    elements: StepElementWithChildren[];
}

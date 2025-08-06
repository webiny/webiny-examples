import { PbElement } from "@webiny/app-page-builder/types";
import { FunnelVm } from "../viewModels/FunnelVm";

export interface ButtonElementData {
    actions: ButtonActionDto[];
    label: string;
}

import { FunnelSubmissionVm } from "../viewModels/FunnelSubmissionVm";
import { FormAPI } from "@webiny/form";

interface ActionParams {
    funnelVm: FunnelVm;
    funnelSubmissionVm: FunnelSubmissionVm;
    form: FormAPI;
}

interface CanAddParams {
    element: PbElement<ButtonElementData>;
}

export interface ButtonActionDefinition {
    type: string;
    name: string;
    description?: string;

    updateButtonLabel?: string;
    action: (params: ActionParams) => boolean | Promise<boolean>;
    canAdd?: (params: CanAddParams) => boolean;

    // Default extra data for the action, if any.
    extra?: any;
}

export interface ButtonActionDto {
    id: string;
    type: string;
    extra: any;
}

import { ContextInterface as Context } from "@webiny/handler/types";
import { I18NContext } from "@webiny/api-i18n/types";
import { BaseI18NContentContext as I18NContentContext } from "@webiny/api-i18n-content/types";
import {SecurityContext, SecurityIdentity, SecurityPermission} from "@webiny/api-security/types";

export interface CarManufacturerEntity {
    PK: string;
    SK: string;
    id: string;
    title: string;
    description?: string;
    createdOn: string;
    savedOn: string;
    createdBy: Pick<SecurityIdentity, "id" | "displayName" | "type">;
    webinyVersion: string;
}

export interface CarManufacturersContext
    extends Context,
        I18NContext,
        I18NContentContext,
        SecurityContext {}

export interface CarManufacturersPermission extends SecurityPermission {
    name: "car-manufacturers";
    rwd?: "r" | "rw" | "rwd";
    specialFeature?: boolean;
}

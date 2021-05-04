import { SecurityPermission } from "@webiny/app-security/types";

export interface CarManufacturerItemUserFields {
    title: string;
    description?: string | null;
    isNice?: boolean;
}

export interface CarManufacturerItem extends CarManufacturerItemUserFields {
    id: string;
    createdOn: Date;
    savedOn: Date;
    createdBy: {
        id: string;
        displayName: string;
        type: string;
    };
}

export interface DataListChildProps {
    data: null | CarManufacturerItem[];
}

export interface CarManufacturersPermission extends SecurityPermission {
    name: "car-manufacturers";
    rwd?: "r" | "rw" | "rwd";
    specialFeature?: boolean;
}

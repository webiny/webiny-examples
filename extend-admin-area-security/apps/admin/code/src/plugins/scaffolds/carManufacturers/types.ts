import { SecurityPermission } from "@webiny/app-security/types";

export interface CarManufacturersPermission extends SecurityPermission {
    name: "car-manufacturers";
    rwd?: "r" | "rw" | "rwd";
    specialFeature?: boolean;
}

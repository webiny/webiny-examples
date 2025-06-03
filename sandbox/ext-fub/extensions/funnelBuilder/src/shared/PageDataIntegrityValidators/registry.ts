import { ContainerElementExists } from "./ContainerElementExists";
import { NoOrphanFieldElementsValidator } from "./NoOrphanFieldElementsValidator";
import { NoOrphanContainerFieldsValidator } from "./NoOrphanContainerFieldsValidator";
import { IsValidFunnelValidator } from "./IsValidFunnelValidator";

export const registry = [
    ContainerElementExists,
    NoOrphanContainerFieldsValidator,
    NoOrphanFieldElementsValidator,
    IsValidFunnelValidator
];

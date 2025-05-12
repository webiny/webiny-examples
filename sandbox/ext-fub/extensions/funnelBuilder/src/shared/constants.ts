export const FUB_ELEMENT_TYPE_PREFIX = "fub-";
export const FUB_FIELD_ELEMENT_TYPE_PREFIX = FUB_ELEMENT_TYPE_PREFIX + "field-";

export const createElementType = (type: string) => {
    return `${FUB_ELEMENT_TYPE_PREFIX}${type}`;
};

export const createFieldElementType = (type: string) => {
    return `${FUB_FIELD_ELEMENT_TYPE_PREFIX}${type}`;
};

export const isFunnelElement = (type?: string) => {
    return type && type.startsWith(FUB_ELEMENT_TYPE_PREFIX);
};

export const isFieldElementType = (type?: string) => {
    return type && type.startsWith(FUB_FIELD_ELEMENT_TYPE_PREFIX);
};

export const isContainerElementType = (type?: string) => {
    return type === CONTAINER_ELEMENT_TYPE;
};

export const isStepElementType = (type?: string) => {
    return type === STEP_ELEMENT_TYPE;
};

export const isSuccessStepElementType = (elementId?: string) => {
    return elementId === SUCCESS_STEP_ELEMENT_ID;
};

export const CONTAINER_ELEMENT_TYPE = createElementType("container");
export const CONTAINER_ELEMENT_ID = createElementType("container");
export const STEP_ELEMENT_TYPE = createElementType("step");
export const SUCCESS_STEP_ELEMENT_ID = "success";

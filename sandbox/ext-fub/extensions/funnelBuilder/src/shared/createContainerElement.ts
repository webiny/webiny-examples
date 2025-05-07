import { CONTAINER_ELEMENT_TYPE } from "./constants";
import { createStepElement } from "./createStepElement";
import { createSuccessStepElement } from "./createSuccessStepElement";
import { getRandomId } from "./getRandomId";
import { FunnelStepModelDto } from "./models/FunnelStepModel";

export const createContainerElement = () => {
    const initialStepData: FunnelStepModelDto = {
        id: getRandomId(),
        title: "New page"
    };

    const successStepData: FunnelStepModelDto = {
        id: "success",
        title: "Success page"
    };

    return {
        id: CONTAINER_ELEMENT_TYPE,
        type: CONTAINER_ELEMENT_TYPE,

        // We are immediately creating a grid element inside our new page element.
        // This was users can start adding content to the grid right away.
        elements: [createStepElement(initialStepData.id), createSuccessStepElement()],
        data: {
            settings: {},
            fields: [],
            steps: [initialStepData, successStepData],
            conditionRules: []
        }
    };
};

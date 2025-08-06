import { getRandomId } from "../../shared/getRandomId";
import { createContainerElement } from "../../shared/createContainerElement";

export const createInitialPageContent = () => {
    return {
        id: getRandomId(),
        type: "document",
        data: {},
        elements: [
            {
                id: getRandomId(),
                type: "block",
                data: {
                    settings: {
                        width: {
                            desktop: {
                                value: "100%"
                            }
                        },
                        margin: {
                            desktop: {
                                top: "0px",
                                right: "0px",
                                bottom: "0px",
                                left: "0px",
                                advanced: true
                            }
                        },
                        padding: {
                            desktop: {
                                all: "10px"
                            }
                        },
                        horizontalAlignFlex: {
                            desktop: "center"
                        },
                        verticalAlign: {
                            desktop: "flex-start"
                        }
                    }
                },
                elements: [createContainerElement()]
            }
        ]
    };
};

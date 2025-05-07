import { getRandomId } from "./getRandomId";
import { createElementType } from "./constants";

export const createStepElement = (stepId?: string) => {
    return {
        id: getRandomId(),
        type: createElementType("step"),
        parent: undefined,
        data: {
            settings: {},
            stepId: stepId || getRandomId()
        },
        elements: [
            {
                id: getRandomId(),
                type: "grid",
                parent: undefined,
                data: {
                    isFunnelStepGrid: true,
                    settings: {
                        width: {
                            desktop: {
                                value: "1100px"
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
                        grid: {
                            cellsType: "12"
                        },
                        gridSettings: {
                            desktop: {
                                flexDirection: "row"
                            },
                            "mobile-landscape": {
                                flexDirection: "column"
                            }
                        },
                        horizontalAlignFlex: { desktop: "flex-start" },
                        verticalAlign: { desktop: "flex-start" }
                    }
                },
                elements: [
                    {
                        id: getRandomId(),
                        type: "cell",
                        parent: undefined,
                        data: {
                            settings: {
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
                                        all: "0px"
                                    }
                                },
                                grid: { size: 12 },
                                horizontalAlignFlex: { desktop: "flex-start" }
                            }
                        },
                        elements: []
                    }
                ]
            }
        ]
    };
};

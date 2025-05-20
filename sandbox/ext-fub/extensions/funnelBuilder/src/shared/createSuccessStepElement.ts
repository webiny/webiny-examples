import { getRandomId } from "./getRandomId";
import { createElementType } from "./constants";

export const createSuccessStepElement = () => {
    return {
        id: getRandomId(),
        type: createElementType("step"),
        parent: undefined,
        data: {
            settings: {},
            stepId: "success"
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
                                all: "30px"
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
                        horizontalAlignFlex: {
                            desktop: "flex-start"
                        },
                        verticalAlign: {
                            desktop: "flex-start"
                        }
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
                                grid: {
                                    size: 12
                                },
                                horizontalAlignFlex: {
                                    desktop: "flex-start"
                                }
                            }
                        },
                        elements: [
                            {
                                id: getRandomId(),
                                type: "icon",
                                parent: undefined,
                                data: {
                                    icon: {
                                        icon: {
                                            type: "icon",
                                            name: "fa6_solid_check",
                                            value: '<path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"/>',
                                            category: "Interfaces",
                                            width: 448,
                                            color: "#7ed321"
                                        },
                                        markup: '<svg width="50" height="50" viewBox="0 0 448 512" color="#7ed321" style="vertical-align: middle;"><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"></path></svg>',
                                        width: 50
                                    },
                                    settings: {
                                        horizontalAlign: "center",
                                        margin: {
                                            desktop: {
                                                all: "0px"
                                            }
                                        },
                                        padding: {
                                            desktop: {
                                                all: "0px"
                                            }
                                        }
                                    }
                                },
                                elements: []
                            },
                            {
                                id: getRandomId(),
                                type: "heading",
                                parent: undefined,
                                data: {
                                    text: {
                                        desktop: {
                                            type: "heading",
                                            alignment: "left",
                                            tag: "h1"
                                        },
                                        data: {
                                            text: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Success!","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"heading-element","version":1,"tag":"h1","styles":[{"styleId":"heading1","type":"typography"}]}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
                                        }
                                    },
                                    settings: {
                                        margin: {
                                            desktop: {
                                                all: "0px"
                                            }
                                        },
                                        padding: {
                                            desktop: {
                                                all: "0px"
                                            }
                                        }
                                    }
                                },
                                elements: []
                            },
                            {
                                id: getRandomId(),
                                type: "paragraph",
                                parent: undefined,
                                data: {
                                    text: {
                                        data: {
                                            text: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Thank you for your submission!","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"paragraph-element","version":1,"textFormat":0,"styles":[{"styleId":"paragraph1","type":"typography"}]}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
                                        }
                                    },
                                    settings: {
                                        margin: {
                                            desktop: {
                                                all: "0px"
                                            }
                                        },
                                        padding: {
                                            desktop: {
                                                all: "0px"
                                            }
                                        }
                                    }
                                },
                                elements: []
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

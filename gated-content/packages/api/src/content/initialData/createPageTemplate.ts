import { PageTemplateInput } from "@webiny/api-page-builder/types";

type CreatePageTemplateParams = Pick<PageTemplateInput, "title" | "slug" | "description">;

export const createPageTemplateData = ({
    title,
    slug,
    description
}: CreatePageTemplateParams): PageTemplateInput => {
    return {
        title,
        slug,
        description,
        tags: [],
        layout: "static",
        content: {
            path: [],
            id: "lecrlcf4",
            type: "document",
            data: {
                template: {
                    variables: [
                        {
                            blockId: "gKfNSPW4X3",
                            variables: [
                                {
                                    id: "Nx84U4hviM",
                                    label: "entry.title",
                                    type: "heading",
                                    value: "Heading"
                                },
                                {
                                    id: "61lTSg39m0",
                                    label: "entry.content",
                                    type: "cmsRichText",
                                    value: [
                                        {
                                            type: "paragraph",
                                            data: {
                                                textAlign: "left",
                                                className: null,
                                                text: "The content of this Rich Text element will be populated dynamically from the Headless CMS content entries."
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            elements: [
                {
                    path: ["lecrlcf4"],
                    id: "gKfNSPW4X3",
                    type: "block",
                    data: {
                        settings: {
                            width: {
                                desktop: {
                                    value: "100%"
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
                            },
                            margin: {
                                desktop: {
                                    right: "0px",
                                    top: "0px",
                                    left: "0px",
                                    advanced: true,
                                    bottom: "0px"
                                }
                            }
                        },
                        templateBlockId: "gKfNSPW4X3",
                        variables: [
                            {
                                id: "Nx84U4hviM",
                                label: "entry.title",
                                type: "heading",
                                value: "Heading"
                            },
                            {
                                id: "61lTSg39m0",
                                label: "entry.content",
                                type: "cmsRichText",
                                value: [
                                    {
                                        type: "paragraph",
                                        data: {
                                            textAlign: "left",
                                            className: null,
                                            text: "The content of this Rich Text element will be populated dynamically from the Headless CMS content entries."
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    elements: [
                        {
                            path: ["lecrlcf4", "gKfNSPW4X3"],
                            id: "gMZa8sVDzo",
                            type: "grid",
                            data: {
                                settings: {
                                    gridSettings: {
                                        "mobile-landscape": {
                                            flexDirection: "column"
                                        },
                                        desktop: {
                                            flexDirection: "row"
                                        }
                                    },
                                    padding: {
                                        desktop: {
                                            all: "10px"
                                        }
                                    },
                                    horizontalAlignFlex: {
                                        desktop: "flex-start"
                                    },
                                    verticalAlign: {
                                        desktop: "flex-start"
                                    },
                                    margin: {
                                        desktop: {
                                            right: "0px",
                                            top: "0px",
                                            left: "0px",
                                            advanced: true,
                                            bottom: "0px"
                                        }
                                    },
                                    grid: {
                                        cellsType: "12"
                                    },
                                    width: {
                                        desktop: {
                                            value: "1100px"
                                        }
                                    }
                                }
                            },
                            elements: [
                                {
                                    path: ["lecrlcf4", "gKfNSPW4X3", "gMZa8sVDzo"],
                                    id: "gaJxUTEPoI",
                                    type: "cell",
                                    data: {
                                        settings: {
                                            padding: {
                                                desktop: {
                                                    all: "0px"
                                                }
                                            },
                                            margin: {
                                                desktop: {
                                                    right: "0px",
                                                    top: "0px",
                                                    left: "0px",
                                                    advanced: true,
                                                    bottom: "0px"
                                                }
                                            },
                                            grid: {
                                                size: 12
                                            }
                                        }
                                    },
                                    elements: [
                                        {
                                            path: [
                                                "lecrlcf4",
                                                "gKfNSPW4X3",
                                                "gMZa8sVDzo",
                                                "gaJxUTEPoI"
                                            ],
                                            id: "Nx84U4hviM",
                                            type: "heading",
                                            data: {
                                                settings: {
                                                    padding: {
                                                        desktop: {
                                                            all: "0px"
                                                        }
                                                    },
                                                    margin: {
                                                        desktop: {
                                                            all: "0px",
                                                            advanced: true,
                                                            bottom: "20px"
                                                        }
                                                    }
                                                },
                                                variableId: "Nx84U4hviM",
                                                text: {
                                                    data: {
                                                        text: "Heading"
                                                    },
                                                    desktop: {
                                                        typography: "heading1",
                                                        tag: "h1",
                                                        type: "heading",
                                                        alignment: "left"
                                                    }
                                                }
                                            },
                                            elements: []
                                        },
                                        {
                                            path: [
                                                "lecrlcf4",
                                                "gKfNSPW4X3",
                                                "gMZa8sVDzo",
                                                "gaJxUTEPoI"
                                            ],
                                            id: "61lTSg39m0",
                                            type: "cmsRichText",
                                            data: {
                                                cmsRichText: [
                                                    {
                                                        type: "paragraph",
                                                        data: {
                                                            textAlign: "left",
                                                            className: null,
                                                            text: "The content of this Rich Text element will be populated dynamically from the Headless CMS content entries."
                                                        }
                                                    }
                                                ],
                                                variableId: "61lTSg39m0"
                                            },
                                            elements: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    };
};

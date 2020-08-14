import React from "react";
import styled from "@emotion/styled";
import { Tab } from "@webiny/ui/Tabs";
import { Input } from "@webiny/ui/Input";
import { Grid, Cell } from "@webiny/ui/Grid";
import {
    PbEditorPageElementPlugin,
    PbEditorPageElementAdvancedSettingsPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import { validation } from "@webiny/validation";
import { ReactComponent as IFrameIcon } from "./iframe-icon.svg";
import IFrameEditor from "./iFrameEditor";
import IFrameRender from "./IFrameRender";

const PreviewBox = styled("div")({
    textAlign: "center",
    height: 40,
    svg: {
        height: 40,
        width: 50
    }
});

export default () => {
    return [
        {
            name: "pb-editor-page-element-iframe",
            type: "pb-editor-page-element",
            elementType: "iframe",
            toolbar: {
                // We use `pb-editor-element-group-media` to put our plugin into the Media group.
                title: "iFrame",
                group: "pb-editor-element-group-media",
                preview() {
                    return (
                        <PreviewBox>
                            <IFrameIcon />
                        </PreviewBox>
                    );
                }
            },
            settings: ["pb-editor-page-element-settings-delete"],
            target: ["row", "column"],
            onCreate: "open-settings",
            create(options) {
                /*
                    Create function is here to create the initial data
                    for the page element, which then is utilized in the
                    IFrameEditor component and in the settings dialog.
                */
                return {
                    type: "iframe",
                    elements: [],
                    data: {
                        iframe: {
                            // The URL property will be populated when user enters the URL in the settings dialog.
                            url: "",
                            height: 370
                        },
                        settings: {
                            horizontalAlign: "center",
                            margin: {
                                desktop: { all: 0 },
                                mobile: { all: 0 }
                            },
                            padding: {
                                desktop: { all: 0 },
                                mobile: { all: 0 }
                            }
                        }
                    },
                    ...options
                };
            },
            render(props) {
                /*
                    Every render function receives the page element's
                    data assigned to the "element.data" property in
                    the received props. In here we will store the
                    "iframe.url" which will be provided via the page
                    element's settings dialog.
                */
                return <IFrameEditor {...props} />;
            },
            renderElementPreview({ width, height }) {
                return <img style={{ width, height }} alt={"iFrame"} />;
            }
        } as PbEditorPageElementPlugin,
        {
            name: "pb-editor-page-element-advanced-settings-iframe",
            type: "pb-editor-page-element-advanced-settings",
            elementType: "iframe",
            render({ Bind }) {
                return (
                    <Tab icon={<IFrameIcon />} label="IFrame">
                        <Grid>
                            <Cell span={12}>
                                {/*
                                    Using the `Bind` component we are able to set
                                    the URL to the page elements `data` property,
                                    which can be accessed in the already mentioned
                                    render function via received props.
                                */}
                                <Bind
                                    name={"iframe.url"}
                                    validators={validation.create("required,url")}
                                >
                                    <Input
                                        label={"IFrame URL"}
                                        description={"Enter an iFrame URL"}
                                    />
                                </Bind>
                            </Cell>
                        </Grid>
                    </Tab>
                );
            }
        } as PbEditorPageElementAdvancedSettingsPlugin,
        {
            name: "pb-render-page-element-iframe",
            type: "pb-render-page-element",
            elementType: "iframe",
            render({ element }) {
                return <IFrameRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};
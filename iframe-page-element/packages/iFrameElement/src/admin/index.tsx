import React from "react";
import styled from "@emotion/styled";
import { Input } from "@webiny/ui/Input";
import { Grid, Cell } from "@webiny/ui/Grid";
import {
    PbEditorPageElementPlugin,
    PbEditorPageElementAdvancedSettingsPlugin
} from "@webiny/app-page-builder/types";
import { validation } from "@webiny/validation";
import { ReactComponent as IFrameIcon } from "../assets/iframe-icon.svg";
import IFrameEmbed from "./components/iFrameEmbed";

import {
    ButtonContainer,
    classes,
    SimpleButton
} from "@webiny/app-page-builder/editor/plugins/elementSettings/components/StyledComponents";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";

const PreviewBox = styled("div")({
    textAlign: "center",
    height: 50,
    svg: {
        height: 50,
        width: 50,
        color: "var(--mdc-theme-text-secondary-on-background)"
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
                return <IFrameEmbed {...props} />;
            },
            renderElementPreview({ width, height }) {
                return <img style={{ width, height }} alt={"iFrame"} />;
            }
        } as PbEditorPageElementPlugin,
        {
            name: "pb-editor-page-element-advanced-settings-iframe",
            type: "pb-editor-page-element-advanced-settings",
            elementType: "iframe",
            render({ Bind, submit }) {
                return (
                    <Accordion title={"IFrame"} defaultValue={true}>
                        <React.Fragment>
                            <Bind
                                name={"iframe.url"}
                                validators={validation.create("required,url")}
                            >
                                <Input label={"URL"} description={"Enter an iFrame URL"} />
                            </Bind>
                            <Grid className={classes.simpleGrid}>
                                <Cell span={12}>
                                    {/* @ts-ignore */}
                                    <ButtonContainer>
                                        {/* @ts-ignore */}
                                        <SimpleButton onClick={submit}>Save</SimpleButton>
                                    </ButtonContainer>
                                </Cell>
                            </Grid>
                        </React.Fragment>
                    </Accordion>
                );
            }
        } as PbEditorPageElementAdvancedSettingsPlugin
    ];
};

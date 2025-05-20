import React from "react";
import { PbEditorPageElementPlugin } from "@webiny/app-page-builder";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import type { Renderer } from "@webiny/app-page-builder-elements/types";
import { createFieldElementType } from "../../../shared/constants";
import { createInitialFieldData, FUB_PAGE_ELEMENT_GROUP } from "../../pageElements/fields/utils";
import { ElementToolbarPreview } from "../../pageElements/ElementToolbarPreview";

export interface PbEditorFunnelFieldPageElementPluginProps {
    fieldType: string;
    renderer: Renderer;
    name: string;
    description: string;
    icon: React.ReactNode;
}

export const PbEditorFunnelFieldPageElementPlugin = (
    props: PbEditorFunnelFieldPageElementPluginProps
) => {
    const fieldType = props.fieldType;
    const pbElementType = createFieldElementType(fieldType);

    return (
        <PbEditorPageElementPlugin
            elementType={pbElementType}
            renderer={props.renderer}
            toolbar={{
                title: props.name,
                group: FUB_PAGE_ELEMENT_GROUP,
                preview() {
                    return (
                        <ElementToolbarPreview
                            title={props.name}
                            icon={props.icon}
                            description={props.description}
                        />
                    );
                }
            }}
            // Defines which types of element settings are available to the user.
            settings={[
                "pb-editor-page-element-settings-delete",
                "pb-editor-page-element-settings-visibility",
                "pb-editor-page-element-style-settings-padding",
                "pb-editor-page-element-style-settings-margin",
                "pb-editor-page-element-style-settings-width",
                "pb-editor-page-element-style-settings-height",
                "pb-editor-page-element-style-settings-background"
            ]}
            target={["cell", "block"]}
            onCreate={OnCreateActions.OPEN_SETTINGS}
            // `create` function creates the initial data for the page element.
            create={options => {
                return {
                    type: pbElementType,
                    elements: [],
                    data: createInitialFieldData(fieldType),
                    ...options
                };
            }}
        />
    );
};

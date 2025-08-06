import React from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { Form } from "@webiny/form";
import { useContainer } from "../../container/ContainerProvider";
import { StepElementData } from "../types";
import { StepElementWithChildren } from "../../container/types";
import { useActiveElementId, useElementWithChildren } from "@webiny/app-page-builder/editor";
import { EmptyCell } from "@webiny/app-page-builder/editor/plugins/elements/cell/EmptyCell";

export const StepAdminRenderer = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement<StepElementData>();
    const elementWithChildren = useElementWithChildren(element.id!) as StepElementWithChildren;

    const [activeElementId] = useActiveElementId();
    const isActive = activeElementId === element.id;

    const { funnelVm } = useContainer();

    if (funnelVm.getActiveStepId() !== element.data.stepId) {
        return null;
    }

    if (!elementWithChildren.elements.length) {
        return <EmptyCell element={element} depth={isActive ? 1000 : 0} />;
    }

    return (
        <div>
            <Form>
                {/* @ts-ignore Incompatible types. Safe to ignore. */}
                {() => <Elements element={elementWithChildren} />}
            </Form>
        </div>
    );
});

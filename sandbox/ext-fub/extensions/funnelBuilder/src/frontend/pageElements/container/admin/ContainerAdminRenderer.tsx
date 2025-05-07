import React from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { ContainerAdminEventHandlers } from "./ContainerAdminEventHandlers";
import { ContainerProvider, useContainer } from "../ContainerProvider";
import { useElementWithChildren, useUpdateElement } from "@webiny/app-page-builder/editor";
import { ContainerElementWithChildren } from "../types";
import { FunnelModelDto } from "../../../../shared/models/FunnelModel";
import styled from "@emotion/styled";
import { Typography } from "@webiny/ui/Typography";

// Had to quickly recreate the Tabs component here because Webiny one
// was having re-rendering issues when adding / removing tabs.
const Tabs = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Tab = styled.div`
    text-align: center;
    flex: 1 0;
    align-content: center;
    border-bottom: 2px solid transparent;
    transition: background-color 300ms, border-bottom 150ms;
    height: 48px;

    &:hover {
        background-color: #fff8f6;
        cursor: pointer;
    }

    &:active {
        background-color: #fedfd7;
    }

    &[data-active="true"] {
        border-bottom: 2px solid #f94d20;
    }
`;

export const ContainerAdmin = () => {
    const { getElement } = useRenderer();
    const element = getElement();
    const elementWithChildren = useElementWithChildren(element.id!) as ContainerElementWithChildren;
    const { funnelVm } = useContainer();

    return (
        <>
            <Tabs>
                {funnelVm.getSteps().map((step, index) => {
                    const isActive = index === funnelVm.getActiveStepIndex();
                    return (
                        <Tab
                            data-active={isActive}
                            key={step.id}
                            onClick={() => {
                                funnelVm.activateStepIndex(index);
                            }}
                        >
                            {isActive ? (
                                <strong style={{ fontWeight: "bold" }}>
                                    <Typography use={"button"}>{step.title}</Typography>
                                </strong>
                            ) : (
                                <Typography use={"button"}>{step.title}</Typography>
                            )}
                        </Tab>
                    );
                })}
            </Tabs>

            {/* @ts-ignore Had an issue with types here. It's fine to ignore. */}
            <Elements element={elementWithChildren} />
        </>
    );
};

export const ContainerAdminRenderer = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement();
    const updateElement = useUpdateElement();

    const updateContainerElementData = (data: FunnelModelDto) => {
        console.log("AJMO CHANGE UPDATE!");
        updateElement(
            {
                ...element,
                data: {
                    ...element.data,
                    ...data
                }
            },
            // Ensures change is stored in history and page is updated on the backend.
            { history: true }
        );
    };

    return (
        <div>
            <ContainerProvider updateElementData={updateContainerElementData}>
                <ContainerAdminEventHandlers />
                <ContainerAdmin />
            </ContainerProvider>
        </div>
    );
});

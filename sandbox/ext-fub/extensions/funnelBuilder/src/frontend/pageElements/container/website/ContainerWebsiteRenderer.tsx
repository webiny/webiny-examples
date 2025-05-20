import React, { useEffect } from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { ContainerProvider, useContainer } from "../ContainerProvider";

export const ContainerAdmin = () => {
    const { getElement } = useRenderer();
    const element = getElement();
    const { funnelSubmissionVm } = useContainer();

    useEffect(() => {
        funnelSubmissionVm.start();
    }, []);

    return (
        <>
            <Elements element={element} />
        </>
    );
};

export const ContainerWebsiteRenderer = createRenderer(() => {
    return (
        <ContainerProvider>
            <ContainerAdmin />
        </ContainerProvider>
    );
});

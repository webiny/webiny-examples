import React, { useEffect } from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { Form } from "@webiny/form";
import { useContainer } from "../../container/ContainerProvider";
import { StepElementData } from "../types";

export const StepWebsiteRenderer = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement<StepElementData>();
    const { funnelSubmissionVm } = useContainer();

    useEffect(() => {
        funnelSubmissionVm.evaluateConditionRulesForActiveStep();
    }, []);

    if (funnelSubmissionVm.activeStepId !== element.data.stepId) {
        return null;
    }

    return (
        <div>
            <Form
                onChange={data => {
                    funnelSubmissionVm.setData(data);
                }}
                onSubmit={data => {
                    funnelSubmissionVm.setData(data);
                    funnelSubmissionVm.submitActiveStep();
                }}
            >
                {() => <Elements element={element} />}
            </Form>
        </div>
    );
});

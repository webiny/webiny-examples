import React from "react";
import { useForm } from "@webiny/form";
import { createRenderer } from "@webiny/app-page-builder-elements";
import styled from "@emotion/styled";
import { useContainer } from "../container/ContainerProvider";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
`;

export const ControlButton = styled.button<{ color: string }>`
    background: ${props => props.color};
    border: none;
    border-radius: 4px;
    padding: 10px;
    color: white;
    cursor: pointer;

    :hover {
        opacity: 0.9;
    }
`;

export const ControlsRenderer = createRenderer(() => {
    const { submit } = useForm();
    const { funnelSubmissionVm, theme } = useContainer();

    return (
        <Wrapper>
            {funnelSubmissionVm.isFirstStep() ? (
                <div style={{ flex: 1 }}></div>
            ) : (
                <ControlButton
                    color={theme.primaryColor}
                    onClick={funnelSubmissionVm.activatePreviousStep.bind(funnelSubmissionVm)}
                >
                    <div className={"button-body"}>Previous</div>
                </ControlButton>
            )}
            <ControlButton onClick={() => submit()} color={theme.primaryColor}>
                <div className={"button-body"}>
                    {funnelSubmissionVm.isFinalStep() ? "Finish" : "Next"}
                </div>
            </ControlButton>
        </Wrapper>
    );
});

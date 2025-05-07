import React, { useCallback, useMemo } from "react";
import { useForm } from "@webiny/form";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import { ButtonElementData } from "./types";
import styled from "@emotion/styled";
import { useContainer } from "../container/ContainerProvider";

interface ButtonWrapperProps {
    fullWidth?: boolean;
    type?: "primary" | "default";
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    ${({ theme, type }) => theme.styles.elements["button"][`${type}`]}
    .button-body {
        width: ${props => (props.fullWidth ? "100%" : "auto")};
        margin-left: auto;

        &:disabled {
            opacity: 0.5;
        }
    }
`;

export const ButtonRenderer = createRenderer(() => {
    const { submit } = useForm();
    const { funnelSubmissionVm } = useContainer();
    const { getElement } = useRenderer();
    const element = getElement<ButtonElementData>();
    const { action } = element.data;

    const buttonLabel = useMemo(() => {
        switch (action) {
            case "previousStep":
                return "Back";
            default:
                return "Next";
        }
    }, [action]);

    const onClick = useCallback(() => {
        if (action === "submit") {
            return submit();
        }

        return funnelSubmissionVm.activatePreviousStep();
    }, [action]);

    return (
        <ButtonWrapper type={"primary"}>
            <button className={"button-body"} onClick={onClick}>
                {buttonLabel}
            </button>
        </ButtonWrapper>
    );
});

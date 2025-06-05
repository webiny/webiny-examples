import React, { useCallback, useState } from "react";
import { useForm } from "@webiny/form";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import styled from "@emotion/styled";
import { useContainer } from "../container/ContainerProvider";
import { ButtonElementData } from "./types";
import { registry } from "./buttonActions/registry";

interface ControlButtonProps {
    color: string;
    disabled?: boolean;
}

const StyledButton = styled.button<ControlButtonProps>`
    background: ${props => props.color};
    border: none;
    border-radius: 4px;
    padding: 10px;
    color: white;
    cursor: pointer;

    ${props => (props.disabled ? "opacity: 0.5; cursor: not-allowed;" : "")}
    :hover {
        ${props => !props.disabled && "opacity: 0.8;"}
    }
`;

export const ButtonRenderer = createRenderer(() => {
    const { funnelSubmissionVm, funnelVm, theme } = useContainer();
    const { getElement } = useRenderer();
    const form = useForm();
    const [runningActions, setRunningActions] = useState(false);

    const element = getElement<ButtonElementData>();

    const runActions = useCallback(async () => {
        const callbacks = element.data.actions.map(action => {
            const actionDefinition = registry.find(a => a.type === action.type);

            if (!actionDefinition) {
                console.warn(`Action type "${action.type}" not found.`);
                return () => Promise.resolve();
            }

            return () => {
                return actionDefinition.action({
                    funnelVm,
                    funnelSubmissionVm,
                    form
                });
            };
        });

        for (const callback of callbacks) {
            try {
                const result = await callback();
                if (result === false) {
                    // If the action returned false, we stop executing further actions.
                    break;
                }
            } catch (error) {
                // This could be improved. We should not use the `alert` way of showing errors.
                alert(error.message);
                break;
            }
        }
    }, [element]);

    const onClick = useCallback(async () => {
        setRunningActions(true);

        return runActions()
            .then(() => {
                // Actions completed successfully.
            })
            .catch(error => {
                console.error("Error running actions:", error);
                // Handle error, e.g., show a notification.
            })
            .finally(() => {
                // Reset running state after actions are done.
                setRunningActions(false);
            });
    }, [runningActions]);

    return (
        <StyledButton color={theme.primaryColor} onClick={onClick} disabled={runningActions}>
            <div className={"button-body"}>{element.data.label || "No label"}</div>
        </StyledButton>
    );
});

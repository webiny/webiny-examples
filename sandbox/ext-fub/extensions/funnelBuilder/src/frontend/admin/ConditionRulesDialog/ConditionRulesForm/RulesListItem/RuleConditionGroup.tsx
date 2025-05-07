import React from "react";
import { ButtonDefault, ButtonIcon, IconButton } from "@webiny/ui/Button";
import { Select } from "@webiny/ui/Select";
import { Typography } from "@webiny/ui/Typography";
import styled from "@emotion/styled";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as BasePlusIcon } from "@material-design-icons/svg/outlined/add.svg";
import { Tooltip } from "@webiny/ui/Tooltip";
import { FunnelConditionGroupModelDto } from "../../../../../shared/models/FunnelConditionGroupModel";
import { useConditionRulesForm } from "../../useConditionRulesForm";
import { RuleCondition } from "./RuleCondition";

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #ebeaeb;
    padding: 5px 0;
`;

const NoConditionsMessage = styled.div`
    padding: 10px;
`;

interface RuleConditionGroupProps {
    conditionGroup: FunnelConditionGroupModelDto;
    depth?: number;
}

export const RuleConditionGroup = ({ conditionGroup, depth = 1 }: RuleConditionGroupProps) => {
    const { addCondition, updateConditionGroupOperator, addConditionGroup, removeConditionGroup } =
        useConditionRulesForm();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 40 * (depth - 1)
            }}
        >
            <Header>
                <Typography use={"overline"}>Conditions</Typography>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        flex: 1,
                        justifyContent: "right"
                    }}
                >
                    <Typography use={"caption"}>Operator:</Typography>
                    <Select
                        rootProps={{ style: { width: 100 } }}
                        size={"small"}
                        value={conditionGroup.operator}
                        onChange={(value: FunnelConditionGroupModelDto["operator"]) =>
                            updateConditionGroupOperator(conditionGroup.id, value)
                        }
                        options={[
                            { value: "and", label: "AND" },
                            { value: "or", label: "OR" }
                        ]}
                    />
                    <ButtonDefault onClick={() => addCondition(conditionGroup.id)} small={true}>
                        <ButtonIcon icon={<BasePlusIcon />} /> Add condition
                    </ButtonDefault>

                    <ButtonDefault
                        onClick={() => addConditionGroup(conditionGroup.id)}
                        small={true}
                    >
                        <ButtonIcon icon={<BasePlusIcon />} /> Add group
                    </ButtonDefault>

                    {depth > 1 ? (
                        <IconButton
                            icon={<DeleteIcon />}
                            onClick={() => removeConditionGroup(conditionGroup.id)}
                        />
                    ) : (
                        <Tooltip content={"Cannot delete root condition group."}>
                            <IconButton
                                disabled={true}
                                icon={<DeleteIcon />}
                                onClick={() => removeConditionGroup(conditionGroup.id)}
                            />
                        </Tooltip>
                    )}
                </div>
            </Header>

            {conditionGroup.items.length === 0 ? (
                <NoConditionsMessage>
                    <Typography use={"body2"} style={{ textAlign: "center", padding: "10px" }}>
                        No conditions added yet.
                    </Typography>
                </NoConditionsMessage>
            ) : (
                conditionGroup.items.map(conditionGroupItem => {
                    const isConditionGroup = "items" in conditionGroupItem;
                    if (isConditionGroup) {
                        return (
                            <RuleConditionGroup
                                conditionGroup={conditionGroupItem}
                                key={conditionGroupItem.id}
                                depth={depth + 1}
                            />
                        );
                    }

                    return (
                        <RuleCondition
                            condition={conditionGroupItem}
                            conditionGroup={conditionGroup}
                            key={conditionGroupItem.id}
                        />
                    );
                })
            )}
        </div>
    );
};

import React, { useMemo } from "react";
import { IconButton } from "@webiny/ui/Button";
import { Select } from "@webiny/ui/Select";
import styled from "@emotion/styled";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { Form } from "@webiny/form";
import { plugins } from "@webiny/plugins";
import { FunnelConditionGroupModelDto } from "../../../../../shared/models/FunnelConditionGroupModel";
import { useConditionRulesForm } from "../../useConditionRulesForm";
import { getConditionOperatorsByValueType } from "../../../../../shared/models/conditionOperators/conditionOperatorFactory";
import { ConditionOperatorParams } from "../../../../../shared/models/FunnelConditionOperatorModel";
import {
    ConditionOperatorParamsComponent,
    PbEditorFunnelConditionOperatorPluginProps
} from "../../../plugins/PbEditorFunnelConditionOperatorPlugin";
import { FunnelConditionModelDto } from "../../../../../shared/models/FunnelConditionModel";

const Fieldset = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
    position: relative;
    width: 100%;
`;

interface RuleConditionGroupProps {
    conditionGroup: FunnelConditionGroupModelDto;
    condition: FunnelConditionModelDto;
}

export const RuleCondition = ({ conditionGroup, condition }: RuleConditionGroupProps) => {
    const { funnel, removeCondition, updateCondition } = useConditionRulesForm();

    const conditionOperatorPlugins = useMemo(() => {
        return plugins.byType(
            "pb-editor-funnel-condition-operator"
        ) as unknown as PbEditorFunnelConditionOperatorPluginProps[];
    }, []);

    const fieldDefinition = funnel.fields.find(f => f.id === condition.sourceFieldId);

    const availableConditionOperators = getConditionOperatorsByValueType(
        fieldDefinition?.value?.type || ""
    );

    const conditionOperatorPlugin = conditionOperatorPlugins.find(
        p => p.operatorClass.type === condition.operator.type
    );

    let ConditionRuleParamsComponent: ConditionOperatorParamsComponent | undefined;
    if (conditionOperatorPlugin) {
        ConditionRuleParamsComponent = conditionOperatorPlugin.settingsRenderer;
    }

    console.log(funnel.conditionRules);

    return (
        <Fieldset>
            <Select
                size={"small"}
                value={condition.sourceFieldId}
                placeholder={"Select field..."}
                onChange={value => {
                    return updateCondition(conditionGroup.id, {
                        ...condition,
                        sourceFieldId: value
                    });
                }}
            >
                {funnel.fields.map(field => (
                    <option key={field.id} value={field.id}>
                        {field.label}
                    </option>
                ))}
            </Select>

            <Select
                size={"small"}
                value={condition.operator.type}
                placeholder={"Select operator..."}
                onChange={(type: string) => {
                    return updateCondition(conditionGroup.id, {
                        ...condition,
                        operator: { type, params: { extra: {} } }
                    });
                }}
            >
                {availableConditionOperators.map(operator => (
                    <option key={operator.type} value={operator.type}>
                        {operator.optionLabel}
                    </option>
                ))}
            </Select>

            {ConditionRuleParamsComponent && (
                <Form<ConditionOperatorParams>
                    data={condition.operator.params}
                    onChange={params => {
                        return updateCondition(conditionGroup.id, {
                            ...condition,
                            operator: {
                                ...condition.operator,
                                params
                            }
                        });
                    }}
                >
                    {() => {
                        return (
                            <>
                                {ConditionRuleParamsComponent ? (
                                    <ConditionRuleParamsComponent
                                        funnel={funnel}
                                        field={fieldDefinition}
                                    />
                                ) : null}
                            </>
                        );
                    }}
                </Form>
            )}

            <IconButton
                icon={<DeleteIcon />}
                onClick={() => removeCondition(conditionGroup.id, condition.id)}
            />
        </Fieldset>
    );
};

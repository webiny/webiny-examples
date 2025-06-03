import { FunnelModel } from "../models/FunnelModel";
import { FunnelSubmissionModel } from "../models/FunnelSubmissionModel";
import { createFirstNameFieldDto } from "./mocks/createFirstNameFieldDto";
import { createLastNameFieldDto } from "./mocks/createLastNameFieldDto";
import { DisableFieldConditionAction } from "../models/conditionActions/DisableFieldConditionAction";

describe("Condition Rules", () => {
    test("neq Operator", async () => {
        const funnel = new FunnelModel({
            steps: [
                { id: "step1", title: "Step 1" },
                { id: "step2", title: "Step 2" }
            ],
            fields: [
                createFirstNameFieldDto({ stepId: "step1" }),
                createLastNameFieldDto({ stepId: "step2" })
            ],
            conditionRules: [
                {
                    id: "rule1",
                    conditionGroup: {
                        id: "cg1",
                        operator: "and",
                        items: [
                            {
                                id: "cg1-c1",
                                sourceFieldId: "firstName",
                                operator: {
                                    type: "neq",
                                    params: { extra: { value: "correct-first-name" } }
                                }
                            }
                        ]
                    },
                    actions: [
                        {
                            id: "cg1-a1",
                            type: DisableFieldConditionAction.type,
                            params: {
                                extra: {
                                    targetFieldId: "lastName"
                                }
                            }
                        }
                    ]
                }
            ]
        });

        const submission1 = new FunnelSubmissionModel(funnel);

        submission1.start();

        expect(submission1.getApplicableActions().length).toBe(1);
        expect(submission1.getField("lastName").disabled).toBe(true);

        submission1.setData({ firstName: "correct-first-name" });
        expect(submission1.getApplicableActions().length).toBe(0);
        expect(submission1.getField("lastName").disabled).toBe(false);
    });

    test("includes Operator", async () => {
        const funnel = new FunnelModel({
            steps: [
                { id: "step1", title: "Step 1" },
                { id: "step2", title: "Step 2" }
            ],
            fields: [
                createFirstNameFieldDto({ stepId: "step1" }),
                createLastNameFieldDto({ stepId: "step2" })
            ],
            conditionRules: [
                {
                    id: "rule1",
                    conditionGroup: {
                        id: "cg1",
                        operator: "and",
                        items: [
                            {
                                id: "cg1-c1",
                                sourceFieldId: "firstName",
                                operator: {
                                    type: "includes",
                                    params: { extra: { value: "correct-first-name" } }
                                }
                            }
                        ]
                    },
                    actions: [
                        {
                            id: "cg1-a1",
                            type: DisableFieldConditionAction.type,
                            params: {
                                extra: {
                                    targetFieldId: "lastName"
                                }
                            }
                        }
                    ]
                }
            ]
        });

        const submission1 = new FunnelSubmissionModel(funnel);

        submission1.start();

        expect(submission1.getApplicableActions().length).toBe(0);
        expect(submission1.getField("lastName").disabled).toBe(false);

        submission1.setData({ firstName: "this is my correct-first-name!" });
        expect(submission1.getApplicableActions().length).toBe(1);
        expect(submission1.getField("lastName").disabled).toBe(true);
    });

    test("notIncludes Operator", async () => {
        const funnel = new FunnelModel({
            steps: [
                { id: "step1", title: "Step 1" },
                { id: "step2", title: "Step 2" }
            ],
            fields: [
                createFirstNameFieldDto({ stepId: "step1" }),
                createLastNameFieldDto({ stepId: "step2" })
            ],
            conditionRules: [
                {
                    id: "rule1",
                    conditionGroup: {
                        id: "cg1",
                        operator: "and",
                        items: [
                            {
                                id: "cg1-c1",
                                sourceFieldId: "firstName",
                                operator: {
                                    type: "notIncludes",
                                    params: { extra: { value: "correct-first-name" } }
                                }
                            }
                        ]
                    },
                    actions: [
                        {
                            id: "cg1-a1",
                            type: DisableFieldConditionAction.type,
                            params: {
                                extra: {
                                    targetFieldId: "lastName"
                                }
                            }
                        }
                    ]
                }
            ]
        });

        const submission1 = new FunnelSubmissionModel(funnel);

        submission1.start();

        expect(submission1.getApplicableActions().length).toBe(1);
        expect(submission1.getField("lastName").disabled).toBe(true);

        submission1.setData({ firstName: "this is my correct-first-name!" });
        expect(submission1.getApplicableActions().length).toBe(0);
        expect(submission1.getField("lastName").disabled).toBe(false);
    });
});

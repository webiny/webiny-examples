import { FunnelModel } from "../models/FunnelModel";
import { FunnelSubmissionModel } from "../models/FunnelSubmissionModel";
import { createFirstNameFieldDto } from "./mocks/createFirstNameFieldDto";
import { createLastNameFieldDto } from "./mocks/createLastNameFieldDto";
import { createEmailFieldDto } from "./mocks/createEmailFieldDto";
import { createColorsFieldDto } from "./mocks/createColorsFieldDto";
import { OnSubmitEndFunnelConditionAction } from "../models/conditionActions/OnSubmitEndFunnelConditionAction";
import { OnSubmitActivateStepConditionAction } from "../models/conditionActions/OnSubmitActivateStepConditionAction";

describe("Condition Rules", () => {
    test("onSubmitEndFunnel action", async () => {
        const funnel = new FunnelModel({
            steps: [
                { id: "step1", title: "Step 1" },
                { id: "step2", title: "Step 2" },
                { id: "step3", title: "Step 3" },
                { id: "step4", title: "Step 4" }
            ],
            fields: [
                createFirstNameFieldDto({ stepId: "step1" }),
                createLastNameFieldDto({ stepId: "step2" }),
                createEmailFieldDto({ stepId: "step3" }),
                createColorsFieldDto({ stepId: "step4" })
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
                                sourceFieldId: "lastName",
                                operator: { type: "eq", params: { extra: { value: "magic" } } }
                            }
                        ]
                    },
                    actions: [
                        {
                            id: "cg1-a1",
                            type: OnSubmitEndFunnelConditionAction.type,
                            params: {
                                extra: {
                                    evaluationStep: "step2"
                                }
                            }
                        }
                    ]
                }
            ]
        });

        let submission1Finished = false;
        const submission1 = new FunnelSubmissionModel(funnel);
        submission1.onFinish(() => {
            submission1Finished = true;
        });

        submission1.setData({ firstName: "first-name" });
        await submission1.submitActiveStep();

        expect(submission1.getActiveStep().id).toBe("step2");

        submission1.setData({ lastName: "magic" });
        await submission1.submitActiveStep();

        expect(submission1.isSuccessStep()).toBe(true);
        expect(submission1Finished).toBe(true);

        let submission2Finished = false;
        const submission2 = new FunnelSubmissionModel(funnel);
        submission2.onFinish(() => {
            submission2Finished = true;
        });

        submission2.setData({ firstName: "first-name" });
        await submission2.submitActiveStep();

        expect(submission2.getActiveStep().id).toBe("step2");

        submission2.setData({ lastName: "last-name" });
        await submission2.submitActiveStep();

        expect(submission2.getActiveStep().id).toBe("step3");
        expect(submission2.isSuccessStep()).toBe(false);
        expect(submission2Finished).toBe(false);
    });

    test("onSubmitActivateStep action", async () => {
        const funnel = new FunnelModel({
            steps: [
                { id: "step1", title: "Step 1" },
                { id: "step2", title: "Step 2" },
                { id: "step3", title: "Step 3" },
                { id: "step4", title: "Step 4" }
            ],
            fields: [
                createFirstNameFieldDto({ stepId: "step1" }),
                createLastNameFieldDto({ stepId: "step2" }),
                createEmailFieldDto({ stepId: "step3" }),
                createColorsFieldDto({ stepId: "step4" })
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
                                sourceFieldId: "lastName",
                                operator: { type: "eq", params: { extra: { value: "magic" } } }
                            }
                        ]
                    },
                    actions: [
                        {
                            id: "cg1-a1",
                            type: OnSubmitActivateStepConditionAction.type,
                            params: {
                                extra: {
                                    evaluationStep: "step2",
                                    targetStepId: "step4"
                                }
                            }
                        }
                    ]
                }
            ]
        });

        let submission1Finished = false;
        const submission1 = new FunnelSubmissionModel(funnel);
        submission1.onFinish(() => {
            submission1Finished = true;
        });

        submission1.setData({ firstName: "first-name" });
        await submission1.submitActiveStep();

        expect(submission1.getActiveStep().id).toBe("step2");

        submission1.setData({ lastName: "magic" });
        await submission1.submitActiveStep();

        expect(submission1.getActiveStep().id).toBe("step4");
        expect(submission1.isSuccessStep()).toBe(false);
        expect(submission1Finished).toBe(false);

        let submission2Finished = false;
        const submission2 = new FunnelSubmissionModel(funnel);
        submission2.onFinish(() => {
            submission2Finished = true;
        });

        submission2.setData({ firstName: "first-name" });
        await submission2.submitActiveStep();

        expect(submission2.getActiveStep().id).toBe("step2");

        submission2.setData({ lastName: "last-name" });
        await submission2.submitActiveStep();

        expect(submission2.getActiveStep().id).toBe("step3");
        expect(submission2.isSuccessStep()).toBe(false);
        expect(submission2Finished).toBe(false);
    });
});

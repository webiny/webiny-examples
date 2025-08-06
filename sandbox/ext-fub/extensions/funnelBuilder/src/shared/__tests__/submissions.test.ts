import { FunnelModel } from "../models/FunnelModel";
import { FunnelSubmissionModel } from "../models/FunnelSubmissionModel";

describe("Funnel Submissions", () => {
    test("e2e test", async () => {
        const funnel = new FunnelModel({
            steps: [
                { id: "step1", title: "Step 1" },
                { id: "step2", title: "Step 2" }
            ],
            fields: [
                {
                    id: "firstName",
                    fieldId: "firstName",
                    stepId: "step1",
                    type: "text",
                    label: "First Name",
                    helpText: "Enter your first name",
                    validators: [
                        {
                            type: "required",
                            params: { extra: {}, errorMessage: "Value is required." }
                        },
                        {
                            type: "minLength",
                            params: {
                                extra: { threshold: 2 },
                                errorMessage: "This field must be at least 2 characters long."
                            }
                        }
                    ],
                    value: {
                        value: "",
                        type: "string",
                        array: false
                    },
                    extra: {
                        placeholderText: "This needs to be a long text.",
                        rows: "10"
                    }
                },
                {
                    id: "lastName",
                    fieldId: "lastName",
                    stepId: "step1",
                    type: "text",
                    label: "Last Name",
                    helpText: "Enter your last name",
                    validators: [
                        { type: "required", params: {} },
                        {
                            type: "minLength",
                            params: {
                                extra: { threshold: 2 },
                                errorMessage: "This field must be at least 2 characters long."
                            }
                        }
                    ],
                    value: {
                        value: "",
                        type: "string",
                        array: false
                    },
                    extra: {}
                },
                {
                    id: "email",
                    fieldId: "email",
                    stepId: "step2",
                    type: "text",
                    label: "Email",
                    helpText: "Enter your email address",
                    validators: [
                        { type: "required", params: { extra: {} } },
                        {
                            type: "pattern",
                            params: {
                                errorMessage: "Value must be a valid email address.",
                                extra: {
                                    preset: "email"
                                }
                            }
                        }
                    ],
                    value: {
                        value: "",
                        type: "string",
                        array: false
                    },
                    extra: {}
                },
                {
                    id: "location",
                    fieldId: "location",
                    stepId: "step2",
                    type: "text",
                    label: "Location",
                    helpText: "Location",
                    validators: [
                        {
                            type: "required",
                            params: { extra: {}, errorMessage: "Value is required." }
                        },
                        {
                            type: "minLength",
                            params: {
                                extra: { threshold: 2 },
                                errorMessage: "This field must be at least 2 characters long."
                            }
                        }
                    ],
                    value: {
                        value: "Earth",
                        type: "string",
                        array: false
                    },
                    extra: {}
                },
                {
                    id: "colors",
                    fieldId: "colors",
                    stepId: "step2",
                    type: "checkboxGroup",
                    label: "Colors",
                    helpText: "Colors",
                    validators: [
                        {
                            type: "required",
                            params: { extra: {}, errorMessage: "Please choose at least one color." }
                        }
                    ],
                    value: {
                        value: [],
                        array: true,
                        type: "stringArray"
                    },
                    extra: {
                        options: [
                            { value: "red", label: "Red" },
                            { value: "green", label: "Green" },
                            { value: "blue", label: "Blue" }
                        ]
                    }
                }
            ],
            conditionRules: [
                {
                    id: "rule1",
                    conditionGroup: {
                        id: "conditionGroup1",
                        operator: "and",
                        items: [
                            {
                                id: "condition1",
                                sourceFieldId: "firstName",
                                operator: {
                                    type: "eq",
                                    params: { extra: { value: "weird-value" } }
                                }
                            }
                        ]
                    },
                    actions: [
                        {
                            id: "action1",
                            type: "disableField",
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

        const funnelSubmission = new FunnelSubmissionModel(funnel);

        let funnelFinished = false;
        funnelSubmission.onFinish(() => {
            funnelFinished = true;
        });

        funnelSubmission.start();

        funnelSubmission.setData({
            firstName: "",
            lastName: "D"
        });

        let submissionResult = await funnelSubmission.submitActiveStep();

        expect(submissionResult).toEqual({
            message: "Field validation failed.",
            data: { firstName: "", lastName: "D" },
            errors: {
                firstName: "Value is required.",
                lastName: "This field must be at least 2 characters long."
            },
            success: false
        });

        let validationResult = await funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            isValid: false,
            errors: {
                firstName: "Value is required.",
                lastName: "This field must be at least 2 characters long."
            }
        });

        // Pass a short value for `firstName` field.
        funnelSubmission.setData({
            firstName: "weird-value",
            lastName: "D"
        });

        expect(funnelSubmission.getField("lastName").disabled).toBe(true);

        // Pass a short value for `firstName` field.
        funnelSubmission.setData({
            firstName: "J",
            lastName: "D"
        });

        expect(funnelSubmission.getField("lastName").disabled).toBe(false);

        submissionResult = await funnelSubmission.submitActiveStep();

        expect(submissionResult).toEqual({
            data: { firstName: "J", lastName: "D" },
            message: "Field validation failed.",
            errors: {
                firstName: "This field must be at least 2 characters long.",
                lastName: "This field must be at least 2 characters long."
            },
            success: false
        });

        validationResult = await funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            isValid: false,
            errors: {
                lastName: "This field must be at least 2 characters long.",
                firstName: "This field must be at least 2 characters long."
            }
        });

        expect(funnelSubmission.getField("lastName").disabled).toBe(false);

        // Pass valid values for both `firstName` and `lastName`.
        funnelSubmission.setData({ firstName: "John", lastName: "Doe" });

        submissionResult = await funnelSubmission.submitActiveStep();

        expect(submissionResult).toEqual({
            message: "",
            data: { firstName: "John", lastName: "Doe" },
            errors: null,
            success: true
        });

        funnelSubmission.submitActiveStep();

        expect(funnelSubmission.getActiveStepIndex()).toEqual(1);

        submissionResult = await funnelSubmission.submitActiveStep();

        expect(submissionResult).toEqual({
            message: "Field validation failed.",
            data: {
                colors: [],
                email: "",
                location: "Earth"
            },
            errors: { colors: "Please choose at least one color.", email: "Value is required." },
            success: false
        });

        validationResult = await funnelSubmission.validateActiveStep();

        expect(validationResult).toEqual({
            isValid: false,
            errors: { colors: "Please choose at least one color.", email: "Value is required." }
        });

        funnelSubmission.setData({ email: "john@example", colors: ["red"] });

        validationResult = await funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            errors: { email: "Value must be a valid email address." },
            isValid: false
        });

        funnelSubmission.setData({
            email: "john@example.com"
        });

        validationResult = await funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            isValid: true,
            errors: {}
        });

        await funnelSubmission.submitActiveStep();

        expect(funnelFinished).toBe(true);

        const dto = funnelSubmission.toDto();
        expect(dto).toEqual({
            activeStepId: "success",
            completedStepIds: ["step1", "step2"],
            fields: {
                colors: {
                    value: {
                        array: true,
                        type: "stringArray",
                        value: ["red"]
                    }
                },
                email: {
                    value: {
                        array: false,
                        type: "string",
                        value: "john@example.com"
                    }
                },
                firstName: {
                    value: {
                        array: false,
                        type: "string",
                        value: "John"
                    }
                },
                lastName: {
                    value: {
                        array: false,
                        type: "string",
                        value: "Doe"
                    }
                },
                location: {
                    value: {
                        array: false,
                        type: "string",
                        value: "Earth"
                    }
                }
            }
        });
    });
});

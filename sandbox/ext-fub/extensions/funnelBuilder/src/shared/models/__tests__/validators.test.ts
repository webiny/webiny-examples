import { validatorFromDto } from "../validators/validatorFactory";
import { MinLengthValidator } from "../validators/MinLengthValidator";
import { RequiredValidator } from "../validators/RequiredValidator";
import { FunnelModel } from "../FunnelModel";
import { FunnelSubmissionModel } from "../FunnelSubmissionModel";

describe("Validator From DTO", () => {
    test("ensure validator is correctly instantiated with no params", async () => {
        const validator = validatorFromDto({
            type: "required",
            params: {}
        });

        expect(validator).toBeInstanceOf(RequiredValidator);
        expect(validator.type).toBe("required");
        expect(validator.params.errorMessage).toBe("Value is required.");
        expect(validator.params.extra).toEqual({});
    });

    test("ensure validator is correctly instantiated with provided params", async () => {
        const validator = validatorFromDto({
            type: "minLength",
            params: {
                extra: {
                    threshold: 2
                },
                errorMessage: "This field must be at least 2 characters long."
            }
        });

        expect(validator).toBeInstanceOf(MinLengthValidator);
        expect(validator.type).toBe("minLength");
        expect(validator.params.errorMessage).toBe(
            "This field must be at least 2 characters long."
        );
        expect(validator.params.extra?.threshold).toBe(2);
    });

    test("pattern validator", async () => {
        const funnel = new FunnelModel({
            steps: [{ id: "step1", title: "Step 1" }],
            fields: [
                {
                    id: "ymd",
                    fieldId: "ymd",
                    stepId: "step1",
                    type: "text",
                    label: "Year/month/date",
                    helpText: "",
                    validators: [
                        {
                            type: "pattern",
                            params: {
                                extra: {
                                    preset: "custom",
                                    regex: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                                    flags: ""
                                },
                                errorMessage: "Invalid YYYY-MM-DD."
                            }
                        }
                    ],
                    extra: {}
                },
                {
                    id: "email",
                    fieldId: "email",
                    stepId: "step1",
                    type: "text",
                    label: "Email",
                    helpText: "Email",
                    validators: [
                        {
                            type: "pattern",
                            params: { extra: { preset: "email" }, errorMessage: "Invalid email." }
                        }
                    ],
                    extra: {}
                },
                {
                    id: "url",
                    fieldId: "url",
                    stepId: "step1",
                    type: "text",
                    label: "URL",
                    helpText: "URL",
                    validators: [
                        {
                            type: "pattern",
                            params: { extra: { preset: "url" }, errorMessage: "Invalid URL." }
                        }
                    ],
                    extra: {}
                },
                {
                    id: "lowerCaseValue",
                    fieldId: "lowerCaseValue",
                    stepId: "step1",
                    type: "text",
                    label: "Lower case value",
                    helpText: "Lower case value",
                    validators: [
                        {
                            type: "pattern",
                            params: {
                                extra: { preset: "lowercase" },
                                errorMessage: "Value must be all lower case."
                            }
                        }
                    ],
                    extra: {}
                },
                {
                    id: "upperCaseValue",
                    fieldId: "upperCaseValue",
                    stepId: "step1",
                    type: "text",
                    label: "Upper case value",
                    helpText: "Upper case value",
                    validators: [
                        {
                            type: "pattern",
                            params: {
                                extra: { preset: "uppercase" },
                                errorMessage: "Value must be all upper case."
                            }
                        }
                    ],
                    extra: {}
                }
            ],
            conditionRules: []
        });

        const funnelSubmission = new FunnelSubmissionModel(funnel);

        funnelSubmission.setData({
            ymd: "yyyy-mm-dd",
            email: "test",
            url: "test",
            lowerCaseValue: "TEST",
            upperCaseValue: "test"
        });

        let validationResult = await funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            isValid: false,
            errors: {
                ymd: "Invalid YYYY-MM-DD.",
                email: "Invalid email.",
                url: "Invalid URL.",
                lowerCaseValue: "Value must be all lower case.",
                upperCaseValue: "Value must be all upper case."
            }
        });

        funnelSubmission.setData({
            ymd: "2025-12-10",
            email: "test@test.com",
            url: "https://www.test.com",
            lowerCaseValue: "test",
            upperCaseValue: "TEST"
        });

        validationResult = await funnelSubmission.validateActiveStep();
        expect(validationResult).toEqual({
            isValid: true,
            errors: {}
        });
    });
});

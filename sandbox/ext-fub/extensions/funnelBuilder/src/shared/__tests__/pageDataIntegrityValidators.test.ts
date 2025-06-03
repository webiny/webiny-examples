import { PageDataIntegrityValidator } from "../PageDataIntegrityValidator";
import { noOrphanFieldElementsValidatorMock } from "./mocks/pageDataIntegrityValidation/noOrphanFieldElementsValidatorMock";
import { noOrphanContainerFieldsMock } from "./mocks/pageDataIntegrityValidation/noOrphanContainerFieldsMock";
import { containerElementExistsMock } from "./mocks/pageDataIntegrityValidation/containerElementExistsMock";
import { isValidFunnelMock } from "./mocks/pageDataIntegrityValidation/isValidFunnelMock";

describe("Page Data Integrity Validators", () => {
    test("NoOrphanContainerFieldsValidator", async () => {
        const result = PageDataIntegrityValidator.validate(noOrphanContainerFieldsMock);
        expect(result).toEqual({
            data: {
                errors: [
                    {
                        data: {
                            orphanFields: ["orphanField-123abc"]
                        },
                        message: "Orphan fields found.",
                        validator: "NoOrphanContainerFieldsValidator"
                    }
                ]
            },
            errorMessage: "Page data integrity validation failed.",
            isValid: false
        });
    });

    test("NoOrphanFieldElementsValidator", async () => {
        const result = PageDataIntegrityValidator.validate(noOrphanFieldElementsValidatorMock);
        expect(result).toEqual({
            data: {
                errors: [
                    {
                        data: {
                            orphanFields: ["jhos45r"]
                        },
                        message: "Orphan fields found.",
                        validator: "NoOrphanFieldElementsValidator"
                    }
                ]
            },
            errorMessage: "Page data integrity validation failed.",
            isValid: false
        });
    });

    test("ContainerElementExists", async () => {
        const result = PageDataIntegrityValidator.validate(containerElementExistsMock);
        expect(result).toEqual({
            data: {
                errors: [
                    {
                        message: "Container element not found.",
                        validator: "ContainerElementExists"
                    }
                ]
            },
            errorMessage: "Page data integrity validation failed.",
            isValid: false
        });
    });

    test("IsValidFunnelValidator", async () => {
        const result = PageDataIntegrityValidator.validate(isValidFunnelMock);
        expect(result).toEqual({
            data: {
                errors: [
                    {
                        data: {
                            missingFieldIds: ["fm1dkir-ORPHAN"]
                        },
                        message: "Condition rules reference fields that do not exist in the model.",
                        validator: "IsValidFunnelValidator"
                    }
                ]
            },
            errorMessage: "Page data integrity validation failed.",
            isValid: false
        });
    });
});

import { PbPage } from "./types";
import { registry } from "./PageDataIntegrityValidators/registry";

export type PageDataIntegrityValidatorError = {
    isValid: false;
    errorMessage: string;
    data: any;
};

export type PageDataIntegrityValidatorSuccess = {
    isValid: true;
    errorMessage: null;
    data: null;
};

export type PageDataIntegrityValidatorResult =
    | PageDataIntegrityValidatorError
    | PageDataIntegrityValidatorSuccess;

export class PageDataIntegrityValidator {
    static PAGE_DATA_INTEGRITY_VALIDATION_ERROR = "PAGE_DATA_INTEGRITY_VALIDATION_ERROR";

    static validate(page: PbPage): PageDataIntegrityValidatorResult {
        const errors = registry
            .map(ValidatorClass => {
                try {
                    ValidatorClass.validate(page);
                    return undefined;
                } catch (error) {
                    return {
                        message: error.message,
                        validator: ValidatorClass.id,
                        data: error.cause
                    };
                }
            })
            .filter(Boolean);

        if (errors.length > 0) {
            return {
                isValid: false,
                errorMessage: "Page data integrity validation failed.",
                data: { errors }
            };
        }

        return {
            isValid: true,
            errorMessage: null,
            data: null
        };
    }
}

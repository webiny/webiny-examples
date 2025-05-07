import { fieldValueFromDto } from "../fieldValues/fieldValueFactory";
import { StringArrayFieldValue } from "../fieldValues/StringArrayFieldValue";

describe("Value From DTO", () => {
    test("ensure field values are correctly instantiated with no params", async () => {
        const validator = fieldValueFromDto({
            type: "stringArray",
            array: true,
            value: []
        });

        expect(validator).toBeInstanceOf(StringArrayFieldValue);
        expect(validator.type).toBe("stringArray");
        expect(validator.value).toBeArrayOfSize(0);
        expect(validator.array).toBe(true);
    });
});

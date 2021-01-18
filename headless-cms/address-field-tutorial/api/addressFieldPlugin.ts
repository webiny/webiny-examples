import {CmsModelFieldToGraphQLPlugin} from "@webiny/api-headless-cms/types";


export default(): CmsModelFieldToGraphQLPlugin => ({
    type: "cms-model-field-to-graphql",
    name: "cms-model-field-to-graphql-address",
    fieldType: "address",
    isSortable: false,
    isSearchable: false,
    read: {
        createSchema() {
            return {
                typeDefs: `
                type Address {
                    country: String
                    city: String
                    zipCode: String
                    street: String
                    streetNumber: String
                    coordinates: String
                }
            `,
                resolvers: {}
            };
        },
        createTypeField({ field }) {
            return `${field.fieldId}: Address`;
        },
        createResolver({ field }) {
            return instance => {
                const value = instance.values[field.fieldId];
                // there is a possibility that value is not populated
                // so we cannot destructure the object because code will break
                if (!value) {
                    return {};
                }
                const {address, coordinates} = value;
                const {country, city, zipCode, street, streetNumber} = address;
                return {
                    country,
                    city,
                    zipCode,
                    street,
                    streetNumber,
                    coordinates
                };
            };
        }
    },
    manage: {
        createTypeField({ field }) {
            return `${field.fieldId}: JSON`;
        },
        createInputField({ field }) {
            return `${field.fieldId}: JSON`;
        }
    }
});
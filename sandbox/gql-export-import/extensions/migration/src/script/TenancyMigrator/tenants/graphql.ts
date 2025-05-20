import { ERROR_FIELDS } from "../utils";

const DATA_FIELDS = /* GraphQL */ `
    fragment DataFields on Tenant {
        id
        name
        description
        tags
        parent
        settings {
            domains {
                fqdn
            }
        }
    }
`;

export const CREATE_TENANT = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    mutation CreateTenant($data: CreateTenantInput!) {
        tenancy {
            createTenant(data: $data) {
                data {
                    ...DataFields
                }
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;

export const LIST_TENANTS = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    query ListTenants {
        tenancy {
            listTenants {
                data {
                    ...DataFields
                }
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;

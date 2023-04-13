import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import { Context } from "~/types";
import { ContextPlugin } from "@webiny/handler";
import { TenantSettings } from "@webiny/api-tenancy/types";

interface ExtendedTenantSettings extends TenantSettings {
    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    createInitialContent: boolean;
}

export default [
    // First, we extend the GraphQL schema, by introducing the four new settings fields.
    new GraphQLSchemaPlugin<Context>({
        typeDefs: /* GraphQL */ `
            extend input TenantSettingsInput {
                contactFirstName: String
                contactLastName: String
                contactEmail: String
                createInitialContent: Boolean
            }

            extend type TenantSettings {
                contactFirstName: String
                contactLastName: String
                contactEmail: String
                createInitialContent: Boolean
            }
        `
    }),

    // Second, we hook onto the `onTenantAfterCreate` event and check if
    // the user enabled the `createInitialContent` flag. If so, we can
    // do additional steps here.
    new ContextPlugin<Context>(context => {
        context.tenancy.onTenantAfterCreate.subscribe(event => {
            const settings = event.tenant.settings as ExtendedTenantSettings;
            if (settings.createInitialContent) {
                console.log("Create initial content...");
            }
        });
    })
];

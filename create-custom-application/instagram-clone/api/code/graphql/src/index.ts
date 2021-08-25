import { createHandler } from "@webiny/handler-aws";
import graphqlPlugins from "@webiny/handler-graphql";
import logsPlugins from "@webiny/handler-logs";
import securityPlugins from "./security";

// Imports plugins created via scaffolding utilities.
import scaffoldsPlugins from "./plugins/scaffolds";

const debug = process.env.DEBUG === "true";

export const handler = createHandler({
    plugins: [securityPlugins(), logsPlugins(), graphqlPlugins({ debug }), scaffoldsPlugins()],
    http: { debug }
});

import { plugins } from "@webiny/plugins";
import apolloLinkPlugins from "./apollo";
import home from "./routes/home";
import pinDetails from "./routes/pinDetails";
import notFound from "./routes/notFound";

// Imports and registers all defined plugins.
plugins.register([
    // Various Apollo client plugins.
    apolloLinkPlugins,

    // Application routes.
    home,
    pinDetails,
    notFound
]);

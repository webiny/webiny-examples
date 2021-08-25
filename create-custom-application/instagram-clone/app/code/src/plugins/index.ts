import { plugins } from "@webiny/plugins";
import apolloLinkPlugins from "./apollo";
import authPlugins from "./auth";
import home from "./routes/home";
import pin from "./routes/pin";
import account from "./routes/account";
import notFound from "./routes/notFound";

// Imports and registers all defined plugins.
plugins.register([
    // Various Apollo client plugins.
    apolloLinkPlugins,
    authPlugins(),

    // Application routes.
    home,
    pin,
    account,
    notFound
]);

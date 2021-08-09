import { plugins } from "@webiny/plugins";
import { WebinyInitPlugin } from "@webiny/app/types";
import welcomeScreenPlugins from "@webiny/app-plugin-admin-welcome-screen";
import routeNotFound from "./routeNotFound";
import basePlugins from "./base";
import apolloLinkPlugins from "./apolloLinks";
import adminPlugins from "./admin";
import i18nPlugins from "./i18n";
import i18nContentPlugins from "./i18nContent";
import securityPlugins from "./security";
import pageBuilderPlugins from "./pageBuilder";
import formBuilderPlugins from "./formBuilder";
import headlessCmsPlugins from "./headlessCms";
import theme from "theme";

// Imports plugins created via scaffolding utilities.
import scaffoldsPlugins from "./scaffolds";
import mp4Plugin from "./plugins/mp4Plugin";

plugins.register([
    basePlugins,
    apolloLinkPlugins,
    adminPlugins,
    welcomeScreenPlugins(),
    routeNotFound,
    i18nPlugins,
    i18nContentPlugins,
    securityPlugins,
    pageBuilderPlugins,
    formBuilderPlugins,
    headlessCmsPlugins,
    theme(),
    scaffoldsPlugins(),
    /**
     * Add mp4 plugin here
     */
    mp4Plugin
]);

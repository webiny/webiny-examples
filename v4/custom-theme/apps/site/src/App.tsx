// Import site app template
import createSite, { SiteAppOptions } from "@webiny/app-template-site";

// Import custom theme plugins
import theme from "theme";

// Import styles which include custom theme styles
import "./App.scss";

/**
 * Export app component factory. Site app exports a component factory because SSR process needs a way to 
 * pass in some plugins specific for SSR, so we need to take those into account and handle `params.plugins`.
 */
export default (params: SiteAppOptions = {}) => {
    // Check if plugins were passed via `params`
    const plugins = params.plugins || [];
    // Push your own plugins. You can add as many plugins as you need.
    plugins.push(theme());
    // Return an app component created using site app template
    return createSite({ ...params, plugins });
};

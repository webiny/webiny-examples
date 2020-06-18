import createSite, { SiteAppOptions } from "@webiny/app-template-site";
import "./App.scss";
import iframe from './iframe';

// Add the iframe plugin in the plugins array
export default (params: SiteAppOptions = {}) => {
    const plugins = params.plugins || [];
    plugins.push(iframe());
    return createSite({ ...params, plugins });
};

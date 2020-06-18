# Creating Custom Page Elements (iframe)

We’ll create a new page element that will allow content creators to embed content using an iframe.

Steps to reproduce the project:

1. Make sure to follow up the [Prerequisites section](https://docs.webiny.com/docs/webiny-apps/page-builder/development/creating-iframe-element-plugin) in the blog post.
2. Move to `apps/admin` folder and add the plugin files in `src`.
3. Open the `src/App.tsx` file and import the plugin that we just created then register in by adding to plugins array inside the default export.
4. Move to `apps/site` folder and add the render plugin files in `src`.
5. Open the `src/App.tsx` file and import the plugin that we just created. And add the plugin to the `SiteAppOptions`
```ts
   export default (params: SiteAppOptions = {}) => {
        const plugins = params.plugins || [];
        plugins.push(iframe());
        return createSite({ ...params, plugins });
    };
```
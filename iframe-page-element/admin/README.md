# Creating Custom Page Elements (iframe)

We’ll create a new page element that will allow content creators to embed content using an iframe.

Steps to reproduce the project:

1. Make sure to follow up the [Prerequisites section](https://docs.webiny.com/docs/webiny-apps/page-builder/development/creating-iframe-element-plugin) in the blog post.
2. Move to `apps/admin` folder and add the plugin files in `src`.
3. Open `src/App.tsx` file and import the plugin that we just created then register in by adding to plugins array inside the default export.
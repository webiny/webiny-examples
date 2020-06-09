# Creating Custom Page Elements (iframe)

We’ll create a new page element that will allow content creators to embed content using an iframe.

Steps to run the project:

1. Make sure to follow up the [prerequisites section](https://docs.webiny.com/docs/webiny-apps/page-builder/development/creating-iframe-element-plugin) section in the blog post.
2. Move to `apps/admin` folder and add the plugin file in `src`
3. Update `plugins: []` in `src/App.tsx` with your plugin name

In `src` folder find the `App.tsx` file, where we have to import and register our plugin.

1. Run `yarn install` or `npm install`
2. Update `<CONTENT_DELIVERY_API_URL>` in `src/apolloClient.js` with your deployed Webiny Content Delivery API url
3. Update `<CONTENT_DELIVERY_API_ACCESS_TOKEN>` in `src/apolloClient.js` with an access token created from Webiny `admin` app
4. Run `yarn serve` or `npm run serve` and voila you have a simple Vue app that fetch content from Webiny Headless CMS and render them 😄

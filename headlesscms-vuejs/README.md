# Simple web app using Webiny Headless CMS & VueJs

Simple web app that list interesting facts about coffee using Webiny Headless CMS & VueJs

Steps to run the project:

1. Run `yarn install` or `npm install`
2. Update `<CONTENT_DELIVERY_API_URL>` in `src/apolloClient.js` with your deployed Webiny Content Delivery API url
3. Update `<CONTENT_DELIVERY_API_ACCESS_TOKEN>` in `src/apolloClient.js` with an access token created from Webiny `admin` app
4. Run `yarn serve` or `npm run serve` and voila you have a simple Vue app that fetch content from Webiny Headless CMS and render them 😄

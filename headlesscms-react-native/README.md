# Create a React Native app using Webiny Headless CMS

A simple React Native app that list channels and their announcements using Webiny Headless CMS

Steps to run the project:

1. Run `yarn install or npm install`
2. Update `<CONTENT_DELIVERY_API_URL>` in `src/graphql/client.js` with your deployed Webiny Content Delivery API url
3. Update `<CONTENT_DELIVERY_API_ACCESS_TOKEN>` in `src/graphql/client.js` with an access token created from Webiny admin app
4. Run `yarn start` and `yarn run android` while an emulator or real physical device is connected to development machine.
And voila you have a simple React Native app that fetch content from Webiny Headless CMS and render them 🚀

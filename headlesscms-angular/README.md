# Simple web app using Webiny Headless CMS & Angular

Simple web app that list blog posts using Webiny Headless CMS & Angular

## Development server

1. Run `yarn install` or `npm install`
2. Update `<CONTENT_DELIVERY_API_URL>` in `src/apolloClient.ts` with your deployed Webiny Content Delivery API url
3. Update `<CONTENT_DELIVERY_API_ACCESS_TOKEN>` in `src/apolloClient.ts` with an access token created from Webiny `admin` app
4. Run `yarn serve` or `npm run serve` and :tada: you just build a blog site that fetch content from Webiny Headless CMS 😄


1. Run `yarn install` or `npm install`
2. Update `<CONTENT_DELIVERY_API_URL>` in `src/apolloClient.ts` with your deployed Webiny Content Delivery API url
3. Update `<CONTENT_DELIVERY_API_ACCESS_TOKEN>` in `src/apolloClient.ts` with an access token created from Webiny `admin` app
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

| :tada: You just build a blog site that fetch content from Webiny Headless CMS 😄

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

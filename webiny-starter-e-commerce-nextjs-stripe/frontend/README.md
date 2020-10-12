# Creating a simple e-commerce website with Webiny Headless CMS + Next.js + Stripe

In this starter tutorial we will uses the [Webiny Headless CMS](http://docs.webiny.com/docs/webiny-apps/headless-cms/features/content-modeling?utm_source=Webiny-blog&utm_medium=webiny-headless-cms-features-docs&utm_campaign=webiny-blog-e-commerce-tutorial-oct-19&utm_content=webiny-headless-cms-features-docs&utm_term=W00180") and [Next.js](https://nextjs.org/)
to create a simple e-commerce website, where you can buy Swag from Open Source Projects such as Webiny, Next.js, Gatsby, etc, with an integrated
shopping cart by [Stripe Payment Intents](https://checkout.stripe.dev/preview).

Steps to reproduce the project:

1. Run `yarn install` or `npm install`
2. Update `<CONTENT_DELIVERY_API_URL>` in `src/apolloClient.ts` with your deployed Webiny Content Delivery API url
3. Update `<CONTENT_DELIVERY_API_ACCESS_TOKEN>` in `src/apolloClient.ts` with an access token created from Webiny `admin` app
4. Update the `stripePromise` in `Layoutcontent.js`, and `checkout.js` files with your `STRIPE_PUBLISHABLE_KEY`
5. Update the `stripe` instance in `checkout.js`, and `payment_intents.js` files with your `STRIPE_SECRET_KEY_HERE`
6. Run the server with `npm run dev`. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

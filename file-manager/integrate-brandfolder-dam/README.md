# Integrate Brandfolder DAM

Brandfolder is a digital asset management (DAM) platform (https://brandfolder.com/). You can  integrate it with Webiny, by following the code examples found in the relevant folders.

---

Click the version of Webiny you're using, and it will take you to the corresponding code example folder:
- [<= 5.39.0](./5.37.x-5.39.0)
- [>= 5.39.1](./5.39.1)

There's no difference in the integration itself between these 2 version ranges. The only difference is the utility that you import from Webiny, to create the component decorators. The Brandfolder integration code is identical.

## How to use the example code?
Copy the changes from the examples to your project, into the exact same files.

> IMPORTANT: In all examples, you'll need to install the [Brandfolder Panel SDK](https://www.npmjs.com/package/@brandfolder-panel/sdk). 
 
To add the dependency directly to the Admin app workspace, run the following command:

```bash
yarn workspace admin add @brandfolder-panel/sdk
```

The final step is to insert your Brandfolder API key in the `apps/admin/src/Brandfolder.tsx` file. You'll find a placeholder `{YOUR_API_KEY}`, which you need to update with a valid API key.

---

Success! Next time you run your Admin app, you'll see Brandfolder UI instead of our built-in File Manager 🏁

## I need help!
Get in touch on our [community Slack channel](https://www.webiny.com/slack/)! :)

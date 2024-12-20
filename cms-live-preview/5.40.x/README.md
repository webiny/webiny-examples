# CMS Content Editing - Live Preview

This example demonstrates how you can set up a Live Preview for your content creators, when working with Webiny Headless CMS. We'll demonstrate Live Preview in the context of our Admin and Website apps, but the concepts apply to any frontend app framework.

The code is organized using [Extensions](https://www.webiny.com/docs/core-development-concepts/basics/extensions), and consists of a `@demo/admin` extension, and a `@demo/website` extension.

## Using the Code

To enable these extensions in your existing Webiny project, follow these steps:

### 1. Install the extension

In your project, run:

```shell
yarn webiny extension cms-live-preview
```

### 2. Configure the `website` app

Add component styles to the `website` app, in `apps/website/public/index.html`:

```html
<!-- Add styles -->
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
  rel="stylesheet"
/>
```

Add live preview route in `apps/website/src/App.tsx`:

```tsx
import React from "react";
import { Website } from "@webiny/app-website";
import { createLivePreviewRoute } from "@demo/live-preview-website";
import "./App.scss";

export const App = () => {
  return <Website routes={[createLivePreviewRoute()]} />;
};
```

### 3. Deploy or start developing

[Deploy your project](https://www.webiny.com/docs/core-development-concepts/basics/project-deployment), or start local development for both Admin and Website apps. If staring local development, in separate terminal windows/tabs, run the following commands:

```shell
# Terminal window 1
yarn webiny watch admin --env=dev

# Terminal window 2
yarn webiny watch website --env=dev
```

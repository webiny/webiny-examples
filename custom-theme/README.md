# Creating a custom theme

This example contains code you need to create a custom theme to use in your `admin` and `site` apps. 

## Prerequisites
All you need is a Webiny project. You can create one by following the [Quick Start](https://docs.webiny.com/docs/get-started/quick-start/) guide.

## Building a custom theme
There's one important thing to understand about themes in Webiny: a theme is used by both `site` and `admin` apps at the same time. So it's two apps that depend on it. Why? Because both apps work with Page Builder and Form Builder, and both those apps have some specific styles and plugins to work. So we need to import the same theme in both `admin` and `site` apps.

To achieve that, the best thing to do is create your theme as a standalone package, within `packages` folder. Basically, whenever you want to create a reusable package, you put it in the `packages` folder.

In the attached code, I've stripped away everything that is not necessary for it to work and only left `apps` and `packages` folder for you to inspect.

## Step by step
1) Add `packages` folder to your `package.json` file (in the root of the project), under `workspaces`. This will tell `yarn` that everything under `packages` folder is considered to be a workspace and will be linked via `node_modules`. See the attached [package.json](./package.json) file for example.

2) Create your theme package under `packages/theme`. Feel free to copy the whole [theme folder](./packages/theme).

3) Once the `theme` package is created, you need to link the package with the monorepo:
```
// run `yarn` in the root of the project
yarn
```

Now your `theme` workspace is linked with `node_modules` but you still need to build it for the first time to make it usable:

```
// from the root of the repo, run the build command using `lerna`
lerna run build --scope=theme
```

Now if you inspect your `packages/theme`, you'll find a `dist` folder that contains the ready-to-use code, linked via `node_modules`. If you inspect `node_modules/theme` you'll find it's pointing to the `dist` folder.

4) Import your theme as shown in the code examples. 
Please inspect [apps/admin/src/App.tsx](./apps/admin/src/App.tsx) and [apps/site/src/App.tsx](./apps/site/src/App.tsx) to find code example with comments. Also don't forget to inspect the corresponding `App.scss` files in both `admin` and `site` apps to see the modifications done to the original files.

> NOTE: during development, you'll want to run `lerna run watch --scope=theme --stream` to have the `theme` package rebuilt each time you make a change to your theme. It will also automatically trigger a rebuild of your apps. 


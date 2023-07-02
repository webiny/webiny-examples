# Programmatic Page Path Generation

This example contains an API plugin which hooks into Page Builder lifecycle events, and generates a page path using folder slugs + user-assigned page path.

For example, if you have a folder hierarchy:

```
Home
|- Articles (slug: articles)
    |- Technology (slug: technology)
```

and you create a page with a path of `quantum-computers` within the `Technology` folder, the generated page path will be `/articles/technology/quantum-computers`.

To enable the plugin, import it in `apps/api/graphql/src/index.ts` and add it to the bottom of the plugins array.
```ts
// ...

import { createPagePathsGenerator } from "./plugins/pagePaths";

export const handler = createHandler({
    plugins: [
        // ...
        createPagePathsGenerator()
    ]
});
```

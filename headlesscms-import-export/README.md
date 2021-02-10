This example demonstrates how to export Headless CMS content models and content model groups into a local file, or copy them directly to another Webiny Headless CMS system.

## How to setup?
1) Run `yarn`
2) Update `config.js` file 
   - `export` key should contain endpoint and API key of the source system
   - `import` key should contain endpoint and API key of the target system
    - optionally, set a `TO_FILE` and `FROM_FILE` if you want to export/import to/from a file
3) Run `node index.js`

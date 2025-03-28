## Overview
This extension contains a GraphQL API-based data migration script. In other words, the script migrates data from source Webiny instance to target Webiny instance using GraphQL API.

## Setup
Before running the script, make sure to add the following environment variables via the `.env` file:

```bash
SOURCE_API_URL=https://xxxxxx.cloudfront.net
SOURCE_API_KEY=xxxxxx
TARGET_API_URL=https://xxxxxx.cloudfront.net
TARGET_API_KEY=xxxxxx
```

API URL can be obtained either by opening the Admin app in your browser and finding the API URL in the network tab, or by running the following command from the project root:

```bash
yarn webiny output api --env dev
```

> [!NOTE]
> Note that the command needs to be run twice, once within the source Webiny project and once within the target Webiny project.

When it comes to API keys, they can be created by opening the Admin app and navigating to the Settings > Access Management > API Keys module. The API key should provide full access to all API resources. In other words, enable full access for all Webiny apps, across all locales.

## Running the Migration Script
To run the migration script, execute the following command:

```bash
tsx ./extensions/migration/src/bin.ts
```

> [!NOTE]
> Note that we're using the `tsx` tool to run the script. The `tsx` tool is a TypeScript-based runner that allows us to run TypeScript files directly from the terminal. If you don't have the `tsx` tool installed, you can install it by running the following command: `yarn add -D tsx`.
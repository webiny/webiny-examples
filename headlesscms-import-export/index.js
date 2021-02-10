const path = require("path");
const { GraphQLClient } = require("graphql-request");
const writeJsonFile = require("write-json-file");
const config = require("./config");
const { LIST_CONTENT_MODELS_WITH_GROUPS } = require("./queries");

(async () => {
    const exportClient = new GraphQLClient(config.export.MANAGE_ENDPOINT, {
        headers: { Authorization: config.export.API_KEY },
    });

    // 1. Export data
    const data = await exportClient.request(LIST_CONTENT_MODELS_WITH_GROUPS);

    await writeJsonFile(path.resolve("tmp/export.json"), data);

    console.log("Exporting");
    console.log(data);
})();

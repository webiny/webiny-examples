const path = require("path");
const omit = require("lodash/omit");
const pick = require("lodash/pick");
const { GraphQLClient } = require("graphql-request");
const writeJsonFile = require("write-json-file");
const loadJsonFile = require("load-json-file");
const Listr = require("listr");
const inquirer = require("inquirer");
const config = require("./config");
const GQL = require("./queries");

const getDataFromRemote = async () => {
    const exportClient = new GraphQLClient(config.export.MANAGE_ENDPOINT, {
        headers: { Authorization: config.export.API_KEY },
    });

    return await exportClient.request(GQL.LIST_CONTENT_MODELS_WITH_GROUPS);
};

const importData = async (data) => {
    const importClient = new GraphQLClient(config.import.MANAGE_ENDPOINT, {
        headers: { Authorization: config.import.API_KEY },
    });

    // 2. Import content model groups
    const tasks = new Listr([
        {
            // Creates root package.json.
            title: "Import content model groups",
            task: async (ctx, task) => {
                // In case a group exists in the target system, we want to get the group ID.
                task.output = `Fetching content model groups from target system...`;
                const targetSystemData = await importClient.request(
                    GQL.LIST_CONTENT_MODELS_WITH_GROUPS
                );

                const targetSystemGroups = targetSystemData.listContentModelGroups.data;
                const groupsToImport = data.listContentModelGroups.data;

                ctx.groups = {};

                for (let i = 0; i < groupsToImport.length; i++) {
                    const group = groupsToImport[i];
                    task.output = `Creating "${group.name}"...`;

                    const existingGroup = targetSystemGroups.find((grp) => grp.slug === group.slug);
                    if (existingGroup) {
                        ctx.groups[group.id] = existingGroup.id;
                    } else {
                        const response = await importClient.request(
                            GQL.CREATE_CONTENT_MODEL_GROUP,
                            {
                                data: omit(group, ["id"]),
                            }
                        );

                        const { data, error } = response.createContentModelGroup;
                        if (data) {
                            ctx.groups[group.id] = data.id;
                        } else {
                            ctx.errors.push(error);
                        }
                    }
                }
            },
        },
        {
            title: "Import content models",
            task: async (ctx, task) => {
                const modelsToImport = data.listContentModels.data;
                for (let i = 0; i < modelsToImport.length; i++) {
                    // Create the model
                    const model = pick(modelsToImport[i], [
                        "name",
                        "modelId",
                        "group",
                        "description",
                    ]);

                    task.output = `Creating "${model.name}"...`;

                    model.group = ctx.groups[model.group.id];
                    const { createContentModel: create } = await importClient.request(
                        GQL.CREATE_CONTENT_MODEL,
                        {
                            data: model,
                        }
                    );

                    if (create.error) {
                        ctx.errors.push(create.error);
                        continue;
                    }

                    // Update with the rest of the model data
                    task.output = `Updating "${model.name}"...`;
                    const { updateContentModel: update } = await importClient.request(
                        GQL.UPDATE_CONTENT_MODEL,
                        {
                            modelId: model.modelId,
                            data: pick(modelsToImport[i], ["fields", "layout", "titleFieldId"]),
                        }
                    );

                    if (update.error) {
                        ctx.errors.push(update.error);
                    }
                }
            },
        },
    ]);

    const context = { errors: [] };
    const output = await tasks.run(context);
    if (output.errors.length) {
        console.error(output.errors);
    }
};

(async () => {
    inquirer
        .prompt([
            {
                message: "What do you want to do?",
                name: "mode",
                type: "list",
                choices: [
                    { name: "Copy data from one system to another", value: "copy" },
                    { name: "Export to local file", value: "export-to-file" },
                    { name: "Import from local file", value: "import-from-file" },
                ],
            },
        ])
        .then(async ({ mode }) => {
            switch (mode) {
                case "copy":
                    await importData(await getDataFromRemote());
                    break;
                case "export-to-file":
                    const dataFromRemote = await getDataFromRemote();
                    await writeJsonFile(path.resolve(config.export.TO_FILE), dataFromRemote);
                    break;
                case "import-from-file":
                    try {
                        const dataFromFile = await loadJsonFile(config.import.FROM_FILE);
                        await importData(dataFromFile);
                    } catch (err) {
                        if (err.code === "ENOENT") {
                            console.log(
                                `ERROR: source file not found at "${config.import.FROM_FILE}!"`
                            );
                            process.exit(1);
                        }
                    }
                    break;
                default:
                    break;
            }

            console.log("Done!");
        })
        .catch((err) => {
            console.error(err);
        });
})();

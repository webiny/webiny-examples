import { CREATE_MODEL, LIST_MODELS } from "./graphql";
import { CmsMigrator } from "../../CmsMigrator";

export class CmsModelsMigrator {
    private readonly cmsMigrator: CmsMigrator;

    constructor(cmsMigrator: CmsMigrator) {
        this.cmsMigrator = cmsMigrator;
    }

    async run() {
        console.log("Migrating models...");

        const { sourceGqlManageClient, targetGqlManageClient } = this.cmsMigrator;
        const sourceListModels = await sourceGqlManageClient.run(LIST_MODELS).then(res => {
            return res.listContentModels;
        });
        const targetListModels = await targetGqlManageClient.run(LIST_MODELS).then(res => {
            return res.listContentModels;
        });

        if (sourceListModels.data.length === 0) {
            console.log("No models to migrate.");
            return;
        }

        for (const sourceModel of sourceListModels.data) {
            if (sourceModel.plugin) {
                console.log(`Skipping model "${sourceModel.name}" because it is a plugin model.`);
                continue;
            }
            if (sourceModel.fields.length === 0) {
                console.log(
                    `Skipping model "${sourceModel.name}" because it does not contain any fields.`
                );
                continue;
            }

            const modelExists = targetListModels.data.find(
                (m: Record<string, any>) => m.modelId === sourceModel.modelId
            );

            if (modelExists) {
                console.log(
                    `Model "${sourceModel.name}" already exists in the target environment.`
                );
                continue;
            }

            console.log(`Migrating model "${sourceModel.name}"...`);

            // Migrate model items.
            const variables = {
                data: {
                    name: sourceModel.name,
                    singularApiName: sourceModel.singularApiName,
                    pluralApiName: sourceModel.pluralApiName,
                    modelId: sourceModel.modelId,
                    group: {
                        id: sourceModel.group.id,
                        slug: sourceModel.group.slug
                    },
                    icon: sourceModel.icon,
                    description: sourceModel.description,
                    layout: sourceModel.layout,
                    fields: sourceModel.fields.map((field: Record<string, any>) => {
                        return {
                            ...field,
                            multipleValues: field.multipleValues || undefined,
                            predefinedValues: field.predefinedValues || undefined
                        };
                    }),
                    titleFieldId: sourceModel.titleFieldId,
                    descriptionFieldId: sourceModel.descriptionFieldId,
                    imageFieldId: sourceModel.imageFieldId,
                    tags: sourceModel.tags
                }
            };

            // Handle `PrototypeModelLS` plural API name. In the newest Webiny version,
            // `PrototypeModelLS` as a plural API name is considered to be invalid.
            if (sourceModel.pluralApiName === "PrototypeModelLS") {
                variables.data.pluralApiName = "PrototypeModelLs";
            }

            const res = await targetGqlManageClient.run(CREATE_MODEL, variables);

            const { error } = res.createContentModel;
            if (error) {
                console.log(
                    `Failed to migrate model "${sourceModel.name}". Error:`,
                    JSON.stringify(error)
                );
            }
        }
    }
}

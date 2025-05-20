import { CREATE_CATEGORY, LIST_CATEGORIES } from "./graphql";
import { PbMigrator } from "../../PbMigrator";

export class PbCategoriesMigrator {
    private readonly pbMigrator: PbMigrator;

    constructor(pbMigrator: PbMigrator) {
        this.pbMigrator = pbMigrator;
    }

    async run() {
        const { sourceGqlClient, targetGqlClient } = this.pbMigrator;
        const sourceListCategories = await sourceGqlClient.run(LIST_CATEGORIES).then(res => {
            return res.pageBuilder.listCategories;
        });
        const targetListCategories = await targetGqlClient.run(LIST_CATEGORIES).then(res => {
            return res.pageBuilder.listCategories;
        });

        if (sourceListCategories.data.length === 0) {
            console.log("No categories to migrate.");
            return;
        }

        for (const category of sourceListCategories.data) {
            const alreadyExists = targetListCategories.data.some(
                (m: Record<string, any>) => m.slug === category.slug
            );

            if (alreadyExists) {
                console.log(
                    `Category "${category.name}" already exists in the target environment.`
                );
                continue;
            }

            console.log(`Migrating category "${category.title}"...`);

            // Migrate category items.
            const res = await targetGqlClient.run(CREATE_CATEGORY, {
                data: {
                    name: category.name,
                    slug: category.slug,
                    url: category.url,
                    layout: category.layout,
                    createdBy: category.createdBy,
                    createdOn: category.createdOn
                }
            });

            const { error } = res.pageBuilder.createCategory;
            if (error) {
                console.log(`Failed to migrate category "${category.title}". Error:`, error);
            }
        }
    }
}

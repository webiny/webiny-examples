import { CREATE_MENU, LIST_MENUS } from "./graphql";
import { PbMigrator } from "../../PbMigrator";

export class PbMenusMigrator {
    private readonly pbMigrator: PbMigrator;

    constructor(pbMigrator: PbMigrator) {
        this.pbMigrator = pbMigrator;
    }

    async run() {
        const { sourceGqlClient, targetGqlClient } = this.pbMigrator;
        const sourceListMenus = await sourceGqlClient.run(LIST_MENUS).then(res => {
            return res.pageBuilder.listMenus;
        });
        const targetListMenus = await targetGqlClient.run(LIST_MENUS).then(res => {
            return res.pageBuilder.listMenus;
        });

        if (sourceListMenus.data.length === 0) {
            console.log("No menus to migrate.");
            return;
        }

        for (const menu of sourceListMenus.data) {
            const alreadyExists = targetListMenus.data.some(
                (m: Record<string, any>) => m.slug === menu.slug
            );

            if (alreadyExists) {
                console.log(`Menu "${menu.title}" already exists in the target environment.`);
                continue;
            }

            console.log(`Migrating menu "${menu.title}"...`);

            // Migrate menu items.
            const res = await targetGqlClient.run(CREATE_MENU, {
                data: {
                    title: menu.title,
                    description: menu.description,
                    slug: menu.slug,
                    items: menu.items,
                    createdBy: menu.createdBy,
                    createdOn: menu.createdOn
                }
            });

            const { error } = res.pageBuilder.createMenu;
            if (error) {
                console.log(`Failed to migrate menu "${menu.title}". Error:`, error);
            }
        }
    }
}

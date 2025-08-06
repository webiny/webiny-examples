import { CREATE_GROUP, DELETE_GROUP, LIST_GROUPS } from "./graphql";
import { CmsMigrator } from "../../CmsMigrator";

export class CmsGroupsMigrator {
    private readonly cmsMigrator: CmsMigrator;

    constructor(cmsMigrator: CmsMigrator) {
        this.cmsMigrator = cmsMigrator;
    }

    async run() {
        console.log("Migrating model groups...");

        const { sourceGqlManageClient, targetGqlManageClient } = this.cmsMigrator;
        const sourceListGroups = await sourceGqlManageClient.run(LIST_GROUPS).then(res => {
            return res.listContentModelGroups;
        });
        const targetListGroups = await targetGqlManageClient.run(LIST_GROUPS).then(res => {
            return res.listContentModelGroups;
        });

        if (sourceListGroups.data.length === 0) {
            console.log("No groups to migrate.");
            return;
        }

        for (const sourceGroup of sourceListGroups.data) {
            const existingTargetGroup = targetListGroups.data.find(
                (m: Record<string, any>) => m.slug === sourceGroup.slug
            );

            if (existingTargetGroup) {
                const ungroupedGroupThatNeedsToBeRecreated =
                    sourceGroup.slug === "ungrouped" && sourceGroup.id !== existingTargetGroup.id;
                if (ungroupedGroupThatNeedsToBeRecreated) {
                    // Let's delete the originally created "ungrouped" group in the target environment
                    // and recreate it with the same ID as the source environment.
                    await targetGqlManageClient
                        .run(DELETE_GROUP, { id: existingTargetGroup.id })
                        .then(res => {
                            return res.deleteContentModelGroup;
                        });
                } else {
                    console.log(
                        `Group "${sourceGroup.name}" already exists in the target environment.`
                    );
                    continue;
                }
            }

            console.log(`Migrating group "${sourceGroup.name}"...`);

            // Migrate group items.
            const res = await targetGqlManageClient.run(CREATE_GROUP, {
                data: {
                    id: sourceGroup.id,
                    name: sourceGroup.name,
                    description: sourceGroup.description,
                    icon: sourceGroup.icon
                }
            });

            const { error } = res.contentModelGroup;
            if (error) {
                console.log(`Failed to migrate group "${sourceGroup.name}". Error:`, JSON.stringify(error));
            }
        }
    }
}

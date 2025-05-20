import { CREATE_PAGE, LIST_PAGES, GET_PAGE } from "./graphql";
import { PbMigrator } from "../../PbMigrator";

export class PbPagesMigrator {
    private readonly pbMigrator: PbMigrator;

    constructor(pbMigrator: PbMigrator) {
        this.pbMigrator = pbMigrator;
    }

    async run() {
        const { sourceGqlClient, targetGqlClient } = this.pbMigrator;

        // Repeat until we have no more pages to migrate.
        let cursor = null;

        do {
            const sourcePagesList: Record<string, any> = await sourceGqlClient
                .run(LIST_PAGES, { after: cursor, limit: 50 })
                .then(res => {
                    return res.pageBuilder.listPages;
                });

            cursor = sourcePagesList.meta.cursor;

            for (const { id: pageId } of sourcePagesList.data) {
                // We have to get the page because listPages does not return the content.
                const sourcePage = await sourceGqlClient
                    .run(GET_PAGE, { id: pageId })
                    .then(res => res.pageBuilder.getPage.data);

                // Migrate page items.
                const { sourceApiUrl, targetApiUrl } = this.pbMigrator;
                const contentWithReplacedFmUrls = JSON.parse(
                    JSON.stringify(sourcePage.content).replaceAll(sourceApiUrl, targetApiUrl)
                );

                const res = await targetGqlClient.run(CREATE_PAGE, {
                    data: {
                        pid: sourcePage.pid,
                        id: sourcePage.id,
                        category: sourcePage.category.slug,
                        title: sourcePage.title,
                        path: sourcePage.path,
                        content: contentWithReplacedFmUrls,
                        savedOn: sourcePage.savedOn,
                        status: sourcePage.status,
                        publishedOn: sourcePage.publishedOn,
                        settings: sourcePage.settings,
                        createdOn: sourcePage.createdOn,
                        createdBy: sourcePage.createdBy
                    }
                });

                const { error } = res.pageBuilder.createPageV2;
                if (error) {
                    console.log(`Failed to migrate page "${sourcePage.title}". Error:`, error);
                }
            }
        } while (cursor);
    }
}

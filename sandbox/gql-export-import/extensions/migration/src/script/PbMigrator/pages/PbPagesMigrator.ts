import {
    CREATE_PAGE,
    LIST_PAGES_ACO_RECORDS,
    RENDER_PAGE,
    GET_PAGE,
    GET_PUBLISHED_PAGE,
    LIST_FOLDERS,
    CREATE_FOLDER
} from "./graphql";
import { PbMigrator } from "../../PbMigrator";

export class PbPagesMigrator {
    private readonly pbMigrator: PbMigrator;

    constructor(pbMigrator: PbMigrator) {
        this.pbMigrator = pbMigrator;
    }

    async run() {
        console.log("Migrating pages...");

        const { sourceGqlClient } = this.pbMigrator;

        // Recreate folders.
        const sourceFolders = await sourceGqlClient
            .run(LIST_FOLDERS, { type: "PbPage", limit: 10_000 })
            .then(res => {
                return res.aco.listFolders;
            });

        if (sourceFolders.error) {
            console.log("Failed to list source folders:", sourceFolders.error);
            return;
        }

        for (const sourceFolder of sourceFolders.data) {
            const { id, title, slug, parentId, type } = sourceFolder;
            const variables = {
                data: {
                    id: id.split("#")[0], // Extract the ID part after the hash
                    title,
                    slug,
                    parentId,
                    type
                }
            };
            const createFolderRes = await this.pbMigrator.targetGqlClient.run(
                CREATE_FOLDER,
                variables
            );

            if (createFolderRes.error) {
                console.log(
                    `Failed to create folder "${sourceFolder.name}":`,
                    createFolderRes.error
                );
            }
        }

        // Repeat until we have no more pages to migrate.
        let cursor = null;

        do {
            const sourcePagesList: Record<string, any> = await sourceGqlClient
                .run(LIST_PAGES_ACO_RECORDS, {
                    where: { type: "PbPage" },
                    limit: 50,
                    after: cursor
                })
                .then(res => {
                    return res.search.listRecords;
                });

            cursor = sourcePagesList.meta.cursor;

            for (const { id: pageId, location } of sourcePagesList.data) {
                const folderId = location?.folderId !== "ROOT" ? location.folderId : null;

                const { data: sourceLatestPage, error } = await sourceGqlClient
                    .run(GET_PAGE, { id: pageId })
                    .then(res => res.pageBuilder.getPage);

                if (error) {
                    console.log(`Failed to get page with ID "${pageId}":`, error);
                    continue;
                }

                if (!sourceLatestPage) {
                    console.log(
                        `Page with ID "${pageId}" not found in source Webiny instance.`,
                        sourceLatestPage
                    );
                    continue;
                }

                // If the latest page is also the published page, we can create it directly.
                if (sourceLatestPage.status === "published") {
                    await this.migratePage(sourceLatestPage, folderId);
                    continue;
                }

                const sourcePublishedPage = await sourceGqlClient
                    .run(GET_PUBLISHED_PAGE, { id: pageId })
                    .then(res => res.pageBuilder.getPublishedPage.data);

                // Does a published revision exist?
                if (!sourcePublishedPage) {
                    await this.migratePage(sourceLatestPage, folderId);
                    continue;
                }

                await this.migratePage(sourcePublishedPage, folderId);
                await this.migratePage(sourceLatestPage, folderId, { skipRender: true });
            }
        } while (cursor);
    }

    private fromSourceToTargetPageData(sourcePage: Record<string, any>): Record<string, any> {
        const contentWithReplacedFmUrls = JSON.parse(
            JSON.stringify(sourcePage.content).replaceAll(
                this.pbMigrator.sourceApiUrl,
                this.pbMigrator.targetApiUrl
            )
        );

        return {
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
        };
    }

    private async migratePage(
        page: Record<string, any>,
        folderId: string,
        options: { skipRender?: boolean } = {}
    ) {
        const variables = {
            data: this.fromSourceToTargetPageData(page),
            meta: { location: { folderId } }
        };
        const latestRes = await this.pbMigrator.targetGqlClient.run(CREATE_PAGE, variables);

        const { error: latestError } = latestRes.pageBuilder.createPageV2;
        if (latestError) {
            console.log(`Failed to migrate page "${page.title}". Error:`, latestError);
        }

        if (options.skipRender) {
            return;
        }

        // Finally, let's issue a render page job to ensure the page is rendered.
        const renderPageVariables = { id: page.id };
        const { error: renderError } = await this.pbMigrator.targetGqlClient
            .run(RENDER_PAGE, renderPageVariables)
            .then(res => res.pageBuilder.rerenderPage);

        if (renderError) {
            console.log(`Failed to render page "${page.title}". Error:`, renderError);
        }
    }
}

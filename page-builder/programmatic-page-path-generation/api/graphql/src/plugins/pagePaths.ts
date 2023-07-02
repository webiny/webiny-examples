import { ContextPlugin } from "@webiny/handler-aws";
import { Folder } from "@webiny/api-aco/types";
import { Context } from "~/types";

interface PageCreateMeta {
    location?: {
        folderId?: string;
    };
}

export const createPagePathsGenerator = () => {
    const createPagePath = (basePath: string, folders: Folder[]) => {
        // Here we assume that `basePath` is in form of `/my-page-path` and we deliberately use only the last
        // part of the path, ignoring all `/` up until the last one.
        const lastSegment = basePath.split("/").pop();
        return [lastSegment, ...folders.map(f => f.slug), ""].reverse().join("/");
    };

    const plugin = new ContextPlugin<Context>(async context => {
        context.pageBuilder.onBeforePageCreate.subscribe(async ({ page, meta }) => {
            const folderId = (meta as PageCreateMeta)?.location?.folderId;
            if (!folderId) {
                return;
            }
            const folders = await context.aco.folder.getFolderWithAncestors(folderId);

            page.path = createPagePath(page.path, folders);
        });

        context.pageBuilder.onBeforePageUpdate.subscribe(async ({ original, page }) => {
            if (original.path === page.path) {
                // `path` was not changed, we can skip path generation.
                return;
            }

            const folders = await context.pageBuilderAco.getAncestorFoldersByPage(page);

            page.path = createPagePath(page.path, folders);
        });
    });
    plugin.name = "api.graphql.page-paths";
    return plugin;
};

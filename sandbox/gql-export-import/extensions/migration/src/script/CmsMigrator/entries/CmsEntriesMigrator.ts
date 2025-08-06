import {
    createCreateEntryMutation,
    createListPublishedEntriesQuery,
    createListEntriesQuery,
    createGetEntryQuery,
    createCreateEntryFromMutation
} from "./graphql";
import { LIST_MODELS } from "../models/graphql";
import { CmsMigrator } from "../../CmsMigrator";

export class CmsEntriesMigrator {
    private readonly cmsMigrator: CmsMigrator;

    constructor(cmsMigrator: CmsMigrator) {
        this.cmsMigrator = cmsMigrator;
    }

    async run() {
        console.log("Migrating entries...");

        const { sourceGqlManageClient, targetGqlManageClient } = this.cmsMigrator;
        const sourceListModels = await sourceGqlManageClient.run(LIST_MODELS).then(res => {
            return res.listContentModels;
        });

        const filteredSourceModels = sourceListModels.data.filter(
            (model: Record<string, any>) => model.fields.length > 0
        );

        for (const model of filteredSourceModels) {
            const LIST_ENTRIES_QUERY = createListEntriesQuery(model);
            const GET_PUBLISHED_ENTRIES_QUERY = createListPublishedEntriesQuery(model);
            const GET_ENTRY = createGetEntryQuery(model);
            const CREATE_ENTRY = createCreateEntryMutation(model);
            const CREATE_ENTRY_FROM = createCreateEntryFromMutation(model);

            // First, get published entries only.
            let cursor = "";
            let iteration = 0;

            console.log(`Migrating entries for model "${model.name}"...`);

            while (true) {
                iteration++;
                const sourceEntriesList = await sourceGqlManageClient
                    .run(LIST_ENTRIES_QUERY, { limit: 30, after: cursor })
                    .then(res => res.content);

                if (sourceEntriesList.error) {
                    console.log(
                        `Failed to list entries for model "${model.name}". Error:`,
                        sourceEntriesList.error
                    );
                    break;
                }

                if (!sourceEntriesList.data.length) {
                    console.log(`No entries to migrate for model "${model.name}".`);
                    console.log();
                    break;
                }

                const sourcePublishedEntryIdsList = await sourceGqlManageClient
                    .run(GET_PUBLISHED_ENTRIES_QUERY, {
                        entries: sourceEntriesList.data.map((entry: Record<string, any>) => ({
                            modelId: model.modelId,
                            id: entry.entryId
                        }))
                    })
                    .then(res => {
                        return res.content.data || [];
                    })
                    .then(entries => {
                        return entries.map((entry: Record<string, any>) => ({
                            id: entry.id,
                            entryId: entry.entryId
                        }));
                    });

                const chunkSize = 5;

                const entriesCount = sourceEntriesList.data.length;
                const entriesCountLabel =
                    entriesCount > 1 ? `${entriesCount} entries` : `${entriesCount} entry`;
                const iterationLabel = `(iteration ${iteration})`;

                console.log(
                    `Migrating ${entriesCountLabel} ${iterationLabel} for model "${model.name}".`
                );

                const chunks = [];
                for (let i = 0; i < sourceEntriesList.data.length; i += chunkSize) {
                    chunks.push(sourceEntriesList.data.slice(i, i + chunkSize));
                }

                for (const chunk of chunks) {
                    const chunkMutationsPromises = [];
                    for (const sourceEntry of chunk) {
                        chunkMutationsPromises.push(
                            new Promise<void>(async resolve => {
                                // TODO : already existS?

                                console.log(`Migrating entry "${sourceEntry.meta.title}"...`);

                                const latestIsPublished = sourceEntry.meta.status === "published";
                                if (latestIsPublished) {
                                    const variables = {
                                        data: this.fromSourceToTargetEntryData(sourceEntry),
                                        options: { validateReferencedEntries: false }
                                    };
                                    const res = await targetGqlManageClient.run(
                                        CREATE_ENTRY,
                                        variables
                                    );

                                    const { error } = res.content;
                                    if (error) {
                                        console.log(
                                            `Failed to migrate entry "${sourceEntry.meta.title}". Error:`,
                                            error
                                        );
                                    }

                                    return resolve();
                                }

                                // Does a published revision exist?
                                const publishedRevision = sourcePublishedEntryIdsList.find(
                                    (item: Record<string, any>) =>
                                        item.entryId === sourceEntry.entryId
                                );

                                if (!publishedRevision) {
                                    const variables = {
                                        data: this.fromSourceToTargetEntryData(sourceEntry),
                                        options: { validateReferencedEntries: false }
                                    };
                                    const res = await targetGqlManageClient.run(
                                        CREATE_ENTRY,
                                        variables
                                    );

                                    const { error } = res.content;
                                    if (error) {
                                        console.log(
                                            `Failed to migrate entry "${sourceEntry.title}". Error:`,
                                            error
                                        );
                                    }

                                    return resolve();
                                }

                                // If a published revision exists, then we must first create it.
                                // And then we can create the latest revision as the 2nd revision.
                                const sourcePublishedRevision = await sourceGqlManageClient
                                    .run(GET_ENTRY, {
                                        revision: publishedRevision.id
                                    })
                                    .then(res => res.content);

                                const publishedRevisionData = this.fromSourceToTargetEntryData(
                                    sourcePublishedRevision.data
                                );
                                const publishedEntryVariables = {
                                    data: publishedRevisionData,
                                    options: { validateReferencedEntries: false }
                                };
                                const publishedRes = await targetGqlManageClient
                                    .run(CREATE_ENTRY, publishedEntryVariables)
                                    .then(res => res.content);

                                const { error: publishedError } = publishedRes;
                                if (publishedError) {
                                    console.log(
                                        `Failed to migrate entry "${sourceEntry.title}". Error:`,
                                        publishedError
                                    );
                                    return resolve();
                                }

                                // Now we can create the latest revision.
                                const latestRevisionData =
                                    this.fromSourceToTargetEntryData(sourceEntry);

                                const latestEntryVariables = {
                                    revision: publishedRes.data.id,
                                    data: latestRevisionData
                                };
                                const latestRes = await targetGqlManageClient.run(
                                    CREATE_ENTRY_FROM,
                                    latestEntryVariables
                                );

                                const { error: latestError } = latestRes.content;
                                if (latestError) {
                                    console.log(
                                        `Failed to migrate entry "${sourceEntry.title}". Error:`,
                                        latestError
                                    );
                                }

                                return resolve();
                            })
                        );
                    }

                    await Promise.all(chunkMutationsPromises);
                }

                if (sourceEntriesList.meta.hasMoreItems) {
                    cursor = sourceEntriesList.meta.cursor;
                    console.log();
                } else {
                    console.log(`No more items to migrate for model "${model.name}".`);
                    console.log();
                    break;
                }
            }
        }
    }

    private fromSourceToTargetEntryData(sourceEntry: Record<string, any>) {
        const {
            id,
            entryId,
            savedOn,
            createdOn,
            createdBy,
            modifiedBy,
            ownedBy,
            meta,
            ...fieldsData
        } = sourceEntry;

        const cmsMetaFields = {
            createdOn: createdOn,
            modifiedOn: savedOn,
            savedOn: savedOn,
            createdBy: ownedBy,
            modifiedBy: ownedBy,
            savedBy: ownedBy,
            revisionCreatedOn: createdOn,
            revisionModifiedOn: savedOn,
            revisionSavedOn: savedOn,
            revisionCreatedBy: ownedBy,
            revisionModifiedBy: ownedBy,
            revisionSavedBy: ownedBy
        };

        const publishingMetaFields: Record<string, any> = { status: meta.status };
        if (meta.publishedOn) {
            Object.assign(publishingMetaFields, {
                revisionFirstPublishedOn: meta.publishedOn,
                revisionLastPublishedOn: meta.publishedOn,
                revisionFirstPublishedBy: modifiedBy,
                revisionLastPublishedBy: modifiedBy,
                firstPublishedOn: meta.publishedOn,
                lastPublishedOn: meta.publishedOn,
                firstPublishedBy: modifiedBy,
                lastPublishedBy: modifiedBy
            });
        }

        return {
            id: entryId,
            ...fieldsData,
            ...cmsMetaFields,
            ...publishingMetaFields
        };
    }
}

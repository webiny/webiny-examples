import {
    createBulkAction,
    IProcessEntry,
    IListEntries
} from "@webiny/api-headless-cms-bulk-actions";
import { getUpdatedTag } from "@demo/bulk-action-background-task-shared"
import { HcmsBulkActionsContext } from "@webiny/api-headless-cms-bulk-actions/types";
import { CmsEntryListParams, CmsModel } from "@webiny/api-headless-cms/types";

class ListLatestEntriesUpdatedThisYear implements IListEntries {
    private readonly context: HcmsBulkActionsContext;

    constructor(context: HcmsBulkActionsContext) {
        this.context = context;
    }

    async execute(modelId: string, params: CmsEntryListParams) {
        const model = await this.context.cms.getModel(modelId);

        if (!model) {
            throw new Error(`Model with ${modelId} not found!`);
        }

        const [entries, meta] = await this.context.cms.listLatestEntries(model, {
            ...params,
            where: {
                ...params.where,
                title_not_startsWith: getUpdatedTag()
            }
        });

        return {
            entries,
            meta
        };
    }
}

class PrependCurrentYearToTitle implements IProcessEntry {
    private readonly context: HcmsBulkActionsContext;

    constructor(context: HcmsBulkActionsContext) {
        this.context = context;
    }

    async execute(model: CmsModel, id: string) {
        const entry = await this.context.cms.getEntryById(model, id);
        await this.context.cms.createEntryRevisionFrom(model, id, {
            title: getUpdatedTag() + entry.values.title
        });
    }
}

export const createBulkActionUpdateYear = () => {
    return [
        createBulkAction({
            name: "updateYear",
            dataLoader: (context: HcmsBulkActionsContext) =>
                new ListLatestEntriesUpdatedThisYear(context),
            dataProcessor: (context: HcmsBulkActionsContext) =>
                new PrependCurrentYearToTitle(context)
        })
    ];
};

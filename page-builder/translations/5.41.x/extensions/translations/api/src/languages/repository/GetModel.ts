import type { Context } from "../../types";

export class GetModel {
    static async byModelId(context: Context, modelId: string) {
        const model = await context.cms.getModel(modelId);

        if (!model) {
            throw new Error(`Model "${modelId}" was not found!`);
        }

        return model;
    }
}

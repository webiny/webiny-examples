import { ErrorResponse, Response, NotFoundResponse } from "@webiny/handler-graphql";
import { utils } from "../utils";
import { ApplicationContext, DeleteCarManufacturerArgs, ResolverResponse, CarManufacturer } from "../types";

const deleteCarManufacturer = async (
    _,
    args: DeleteCarManufacturerArgs,
    context: ApplicationContext
): Promise<ResolverResponse<boolean>> => {
    const { db } = context;
    const { id } = args;
    /**
     * Primary key is always constructed out of the id and a fixed CarManufacturer configuration.
     */
    const primaryKey = utils.createPk(context, id);
    /**
     * First we need to check if the carManufacturer we want to delete is actually in the database.
     */
    const [[item]] = await db.read<CarManufacturer>({
        ...utils.db(context),
        query: {
            PK: primaryKey,
            SK: id
        },
        limit: 1
    });
    if (!item) {
        return new NotFoundResponse(`CarManufacturer with id "${id}" not found.`);
    }
    /**
     * We do operations in batch, when possible, so there are no multiple calls towards the DynamoDB.
     */
    const batch = db.batch();
    batch.delete(
        /**
         * Delete the DynamoDB carManufacturer record.
         */
        {
            ...utils.db(context),
            query: {
                PK: primaryKey,
                SK: id
            }
        },
        /**
         * Delete the DynamoDB carManufacturer record in stream table.
         * Can be removed if Elasticsearch is not used.
         */
        {
            ...utils.esDb(context),
            query: {
                PK: primaryKey,
                SK: id
            }
        }
    );
    /**
     * Try to delete the data from the DynamoDB. Fail with response if error happens.
     */
    try {
        await batch.execute();
    } catch (ex) {
        return new ErrorResponse({
            message: ex.message,
            code: ex.code || "CAR_MANUFACTURER_DELETE_ERROR",
            data: ex
        });
    }

    return new Response(true);
};

export default deleteCarManufacturer;

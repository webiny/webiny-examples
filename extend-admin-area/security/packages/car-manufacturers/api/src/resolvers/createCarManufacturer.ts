import mdbid from "mdbid";
import { utils } from "../utils";
import { ApplicationContext, CreateCarManufacturerArgs, ResolverResponse, CarManufacturer } from "../types";
import { ErrorResponse, Response } from "@webiny/handler-graphql";

const createCarManufacturer = async (
    _,
    args: CreateCarManufacturerArgs,
    context: ApplicationContext
): Promise<ResolverResponse<CarManufacturer>> => {
    const { db, security, elasticSearch } = context;
    const { data } = args;

    /**
     * Build the CarManufacturer data model to be inserted into the database.
     */
    const model: CarManufacturer = {
        id: mdbid(),
        createdBy: security.getIdentity(),
        savedBy: security.getIdentity(),
        /**
         * We need to transform the Date object to iso string since DynamoDB insert will not do it automatically.
         */
        createdOn: new Date().toISOString(),
        savedOn: new Date().toISOString(),
        /**
         * Custom user defined fields.
         */
        title: data.title,
        description: data.description,
        isNice: data.isNice === undefined ? false : data.isNice
    };
    /**
     * Create, and check for existence, index name that is going to be used when streaming from DDB to Elasticsearch.
     * Can be removed if Elasticsearch is not used.
     */
    const esConfig = utils.es(context);
    try {
        const { body: hasIndice } = await elasticSearch.indices.exists(esConfig);
        if (!hasIndice) {
            return new ErrorResponse({
                message: "You must run the install mutation to create the Elasticsearch index.",
                code: "ELASTICSEARCH_ERROR",
                data: esConfig
            });
        }
    } catch (ex) {
        return new ErrorResponse({
            message: ex.message || "Error while checking for Elasticsearch index existence.",
            code: ex.code || "ELASTICSEARCH_ERROR",
            data: ex.data
        });
    }
    const { index: esIndex } = esConfig;

    /**
     * Primary key is always constructed out of the carManufacturer.id and a fixed CarManufacturer configuration.
     */
    const primaryKey = utils.createPk(context, model.id);
    /**
     * We do operations in batch, when possible, so there are no multiple calls towards the DynamoDB.
     */
    const batch = db.batch();
    batch
        /**
         * Create the DynamoDB carManufacturer record.
         */
        .create({
            ...utils.db(context),
            data: {
                PK: primaryKey,
                /**
                 * Need something as SecondaryKey so we put the id of the CarManufacturer.
                 * Can be createdOn so you can sort and search by it (if there is no Elasticsearch).
                 */
                SK: model.id,
                ...model,
                /**
                 * We always insert the version of Webiny this carManufacturer was created with so it can be used later for upgrades.
                 */
                webinyVersion: context.WEBINY_VERSION
            }
        })
        /**
         * Create the DynamoDB carManufacturer record in stream table.
         * Can be removed if Elasticsearch is not used.
         */
        .create({
            ...utils.esDb(context),
            data: {
                PK: primaryKey,
                SK: model.id,
                /**
                 * Elasticsearch index that is this table streaming to.
                 */
                index: esIndex,
                data: {
                    ...model,
                    webinyVersion: context.WEBINY_VERSION
                }
            }
        });
    /**
     * Try to insert the data into the DynamoDB. Fail with response if error happens.
     */
    try {
        await batch.execute();
    } catch (ex) {
        return new ErrorResponse({
            message: ex.message,
            code: ex.code || "CAR_MANUFACTURER_INSERT_ERROR",
            data: ex
        });
    }

    return new Response(model);
};

export default createCarManufacturer;

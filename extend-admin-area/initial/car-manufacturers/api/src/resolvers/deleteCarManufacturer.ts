import { ErrorResponse, Response, NotFoundResponse } from "@webiny/handler-graphql";
import { NotAuthorizedResponse } from "@webiny/api-security";

// We use this when specifying the return types of the getPermission function call (below).
import { FullAccessPermission } from "@webiny/api-security/types";

import { utils } from "../utils";
import {
    ApplicationContext,
    DeleteCarManufacturerArgs,
    ResolverResponse,
    CarManufacturer,
    // Creating types for security permissions makes our code less error-prone and more readable.
    CarManufacturersPermission
} from "../types";

const deleteCarManufacturer = async (
    _,
    args: DeleteCarManufacturerArgs,
    context: ApplicationContext
): Promise<ResolverResponse<boolean>> => {
    // First, check if the current identity can perform the "getCarManufacturer" query,
    // within the detected locale. An error will be thrown if access is not allowed.
    const hasLocaleAccess = await context.i18nContent.hasI18NContentPermission();
    if (!hasLocaleAccess) {
        return new NotAuthorizedResponse();
    }

    // Next, check if the current identity possesses the "car-manufacturers" permission.
    // Note that, if the identity has full access, "FullAccessPermission" permission
    // will be returned instead, which is equal to: { name: "*"}.
    const permission = await context.security.getPermission<
        CarManufacturersPermission | FullAccessPermission
    >("car-manufacturers");

    if (!permission) {
        return new NotAuthorizedResponse();
    }

    // Note that the received permission object can also be `{ name: "*" }`. If so, that
    // means we are dealing with the super admin, who has unlimited access.
    let hasAccess = permission.name === "*";
    if (!hasAccess) {
        // If not super admin, let's check if we have the "d" in the `rwd` property.
        hasAccess =
            permission.name === "car-manufacturers" &&
            permission.rwd &&
            permission.rwd.includes("d");
    }

    // Finally, if current identity doesn't have access, we immediately exit.
    if (!hasAccess) {
        return new NotAuthorizedResponse();
    }

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

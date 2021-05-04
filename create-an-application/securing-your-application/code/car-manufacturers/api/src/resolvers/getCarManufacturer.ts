import { Response, NotFoundResponse } from "@webiny/handler-graphql";
import { NotAuthorizedResponse } from "@webiny/api-security";

// We use this when specifying the return types of the getPermission function call (below).
import { FullAccessPermission } from "@webiny/api-security/types";

import { utils } from "../utils";
import {
    ApplicationContext,
    GetCarManufacturerArgs,
    ResolverResponse,
    CarManufacturer,
    // Creating types for security permissions makes our code less error-prone and more readable.
    CarManufacturersPermission
} from "../types";

const getCarManufacturer = async (
    _,
    args: GetCarManufacturerArgs,
    context: ApplicationContext
): Promise<ResolverResponse<CarManufacturer>> => {
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
        // If not super admin, let's check if we have the "r" in the `rwd` property.
        hasAccess =
            permission.name === "car-manufacturers" &&
            permission.rwd &&
            permission.rwd.includes("r");
    }

    // Finally, if current identity doesn't have access, we immediately exit.
    if (!hasAccess) {
        return new NotAuthorizedResponse();
    }

    const { db } = context;
    const { id } = args;

    const primaryKey = utils.createPk(context, id);

    const response = await db.read<CarManufacturer>({
        ...utils.db(context),
        query: {
            PK: primaryKey,
            SK: id
        },
        limit: 1
    });

    const [items] = response;
    const [item] = items;

    if (!item) {
        return new NotFoundResponse(`CarManufacturer with id "${id}" not found.`);
    }

    return new Response(item);
};

export default getCarManufacturer;

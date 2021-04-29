import { Response, NotFoundResponse } from "@webiny/handler-graphql";
import { NotAuthorizedResponse } from "@webiny/api-security";

import { utils } from "../utils";
import {
    ApplicationContext,
    GetCarManufacturerArgs,
    ResolverResponse,
    CarManufacturer,
    CarManufacturersPermission
} from "../types";

const getCarManufacturer = async (
    _,
    args: GetCarManufacturerArgs,
    context: ApplicationContext
): Promise<ResolverResponse<CarManufacturer>> => {
    // We get the "car-manufacturers" permission from current identity (logged in user).
    const permission = await context.security.getPermission<CarManufacturersPermission>("car-manufacturers");
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

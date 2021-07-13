import { CarManufacturerEntity, CarManufacturersPermission } from "../types";
import { CarManufacturer } from "../entities";
import CarManufacturersResolver from "./CarManufacturersResolver";

// We use this when specifying the return types of the getPermission function call (below).
import { FullAccessPermission } from "@webiny/api-security/types";

/**
 * Contains base `getCarManufacturer` and `listCarManufacturers` GraphQL resolver functions.
 * Feel free to adjust the code to your needs. Also, note that at some point in time, you will
 * most probably want to implement security-related checks.
 * https://www.webiny.com/docs/how-to-guides/webiny-cli/scaffolding/extend-graphql-api#essential-files
 */

interface GetCarManufacturerParams {
    id: string;
}

interface ListCarManufacturersParams {
    sort?: "createdOn_ASC" | "createdOn_DESC";
    limit?: number;
    after?: string;
    before?: string;
}

interface ListCarManufacturersResponse {
    data: CarManufacturerEntity[];
    meta: { limit: number; after: string; before: string };
}

interface CarManufacturersQuery {
    getCarManufacturer(params: GetCarManufacturerParams): Promise<CarManufacturerEntity>;
    listCarManufacturers(params: ListCarManufacturersParams): Promise<ListCarManufacturersResponse>;
}

/**
 * To define our GraphQL resolvers, we are using the "class method resolvers" approach.
 * https://www.graphql-tools.com/docs/resolvers#class-method-resolvers
 */
export default class CarManufacturersQueryResolver extends CarManufacturersResolver
    implements CarManufacturersQuery {
    /**
     * Returns a single CarManufacturer entry from the database.
     * @param id
     */
    async getCarManufacturer({ id }: GetCarManufacturerParams) {
        // First, check if the current identity can perform the "getCarManufacturer" query,
        // within the detected locale. An error will be thrown if access is not allowed.
        const hasLocaleAccess = await this.context.i18nContent.hasI18NContentPermission();
        if (!hasLocaleAccess) {
            throw new Error("Not authorized.");
        }

        // Next, check if the current identity possesses the "car-manufacturers" permission.
        // Note that, if the identity has full access, "FullAccessPermission" permission
        // will be returned instead, which is equal to: { name: "*"}.
        const permission = await this.context.security.getPermission<
            CarManufacturersPermission | FullAccessPermission
        >("car-manufacturers");

        if (!permission) {
            throw new Error("Not authorized.");
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
            throw new Error("Not authorized.");
        }

        // Query the database and return the entry. If entry was not found, an error is thrown.
        const { Item: carManufacturer } = await CarManufacturer.get({ PK: this.getPK(), SK: id });
        if (!carManufacturer) {
            throw new Error(`CarManufacturer "${id}" not found.`);
        }

        return carManufacturer;
    }

    /**
     * List multiple CarManufacturer entries from the database.
     * Supports basic sorting and cursor-based pagination.
     * @param limit
     * @param sort
     * @param after
     * @param before
     */
    async listCarManufacturers({ limit = 10, sort, after, before }: ListCarManufacturersParams) {
        const PK = this.getPK();
        const query = { limit, reverse: sort !== "createdOn_ASC", gt: undefined, lt: undefined };
        const meta = { limit, after: null, before: null };

        // The query is constructed differently, depending on the "before" or "after" values.
        if (before) {
            query.reverse = !query.reverse;
            if (query.reverse) {
                query.lt = before;
            } else {
                query.gt = before;
            }

            const { Items } = await CarManufacturer.query(PK, { ...query, limit: limit + 1 });

            const data = Items.slice(0, limit).reverse();

            const hasBefore = Items.length > limit;
            if (hasBefore) {
                meta.before = Items[Items.length - 1].id;
            }

            meta.after = Items[0].id;

            return { data, meta };
        }

        if (after) {
            if (query.reverse) {
                query.lt = after;
            } else {
                query.gt = after;
            }
        }

        const { Items } = await CarManufacturer.query(PK, { ...query, limit: limit + 1 });

        const data = Items.slice(0, limit);

        const hasAfter = Items.length > limit;
        if (hasAfter) {
            meta.after = Items[limit - 1].id;
        }

        if (after) {
            meta.before = Items[0].id;
        }

        return { data, meta };
    }
}

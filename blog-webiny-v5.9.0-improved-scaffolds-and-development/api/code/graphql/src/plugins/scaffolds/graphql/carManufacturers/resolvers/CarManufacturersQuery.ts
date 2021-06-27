import { CarManufacturerEntity } from "../types";
import { CarManufacturers } from "../entities";
import CarManufacturersResolver from "./CarManufacturersResolver";

/**
 * Contains base `getCarManufacturer` and `listCarManufacturers` GraphQL resolver functions.
 * Feel free to adjust the code to your needs. Also, note that at some point in time, you will
 * most probably want to implement security-related checks.
 * https://www.webiny.com/docs/how-to-guides/webiny-cli/scaffolding/extend-graphql-api/resolvers/query
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
        // Query the database and return the entry. If entry was not found, an error is thrown.
        const { Item: carManufacturer } = await CarManufacturers.get({ PK: this.getPK(), SK: id });
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

            const { Items } = await CarManufacturers.query(PK, { ...query, limit: limit + 1 });

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

        const { Items } = await CarManufacturers.query(PK, { ...query, limit: limit + 1 });

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

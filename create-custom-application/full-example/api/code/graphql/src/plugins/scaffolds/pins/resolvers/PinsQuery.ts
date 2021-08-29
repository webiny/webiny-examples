import { PinEntity } from "../types";
import { Pin } from "../entities";
import PinsResolver from "./PinsResolver";
/**
 * Contains base `getPin` and `listPins` GraphQL resolver functions.
 * Feel free to adjust the code to your needs. Also, note that at some point in time, you will
 * most probably want to implement security-related checks.
 * https://www.webiny.com/docs/how-to-guides/scaffolding/extend-graphql-api#essential-files
 */

interface GetPinParams {
    id: string;
}

interface ListPinsParams {
    sort?: "createdOn_ASC" | "createdOn_DESC";
    limit?: number;
    after?: string;
    before?: string;
}

interface ListPinsResponse {
    data: PinEntity[];
    meta: { limit: number; after: string; before: string };
}
interface ListPinsResponse {
    data: PinEntity[];
    meta: { limit: number; after: string; before: string };
}

interface PinsQuery {
    getPin(params: GetPinParams): Promise<PinEntity>;
    listPins(params: ListPinsParams): Promise<ListPinsResponse>;
}

/**
 * To define our GraphQL resolvers, we are using the "class method resolvers" approach.
 * https://www.graphql-tools.com/docs/resolvers#class-method-resolvers
 */
export default class PinsQueryResolver extends PinsResolver implements PinsQuery {
    /**
     * Returns a single Pin entry from the database.
     * @param id
     */
    async getPin({ id }: GetPinParams) {
        // Query the database and return the entry. If entry was not found, an error is thrown.
        const { Item: pin } = await Pin.get({ PK: this.getPK(), SK: id });
        if (!pin) {
            throw new Error(`Pin "${id}" not found.`);
        }

        return pin;
    }

    /**
     * List multiple Pin entries from the database.
     * Supports basic sorting and cursor-based pagination.
     * @param limit
     * @param sort
     * @param after
     * @param before
     */
    async listPins({ limit = 10, sort, after, before }: ListPinsParams) {
        const PK = this.getPK();
        const query = { limit, reverse: sort !== "createdOn_ASC", gt: undefined, lt: undefined };
        const meta = { limit, after: null, before: null };

        console.log("identity", await JSON.stringify(this.context.security.getIdentity(), null, 2));

        // The query is constructed differently, depending on the "before" or "after" values.
        if (before) {
            query.reverse = !query.reverse;
            if (query.reverse) {
                query.lt = before;
            } else {
                query.gt = before;
            }

            const { Items } = await Pin.query(PK, { ...query, limit: limit + 1 });

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

        const { Items } = await Pin.query(PK, { ...query, limit: limit + 1 });

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

import { ListErrorResponse, ListResponse } from "@webiny/handler-graphql";
import { NotAuthorizedResponse } from "@webiny/api-security";

// We use this when specifying the return types of the getPermission function call (below).
import { FullAccessPermission } from "@webiny/api-security/types";

import { utils } from "../utils";
import {
    createElasticsearchQuery,
    encodeElasticsearchCursor,
    decodeElasticsearchCursor,
    createElasticsearchSort
} from "../es";
import {
    ApplicationContext,
    ListResolverResponse,
    ListCarManufacturersArgs,
    CarManufacturer,
    // Creating types for security permissions makes our code less error-prone and more readable.
    CarManufacturersPermission
} from "../types";

interface GetResultSizeArgs {
    limit?: number;
    maxLimit?: number;
    defaultLimit?: number;
}

const getResultSize = (args: GetResultSizeArgs): number => {
    const { limit, maxLimit = 1000, defaultLimit = 50 } = args;
    if (!limit || limit <= 0) {
        return defaultLimit;
    } else if (limit >= maxLimit) {
        return maxLimit;
    }
    return limit;
};

/**
 * Listing carManufacturers is using Elasticsearch only.
 * If you want to remove the Elasticsearch, you will need to write your own DynamoDB fetching.
 */
const listCarManufacturers = async (
    _,
    args: ListCarManufacturersArgs,
    context: ApplicationContext
): Promise<ListResolverResponse<CarManufacturer>> => {
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

    const { elasticSearch } = context;
    const { where, sort, limit, after } = args;
    /**
     * Keep limit in some constraint.
     * You can put whatever numbers you want here (if it is allowed by Elasticsearch).
     */
    const size = getResultSize({ limit });
    /**
     * Build the Elasticsearch request body.
     * Can be removed if Elasticsearch is not used.
     */
    const body = {
        query: createElasticsearchQuery(where),
        sort: createElasticsearchSort(sort),
        /**
         * We always take one extra record to see if there are more records to be fetched.
         */
        size: size + 1,
        /**
         * We use the cursor instead from since you can fetch more records with it.
         * Read more about it: https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html
         */
        // eslint-disable-next-line
        search_after: decodeElasticsearchCursor(after) || undefined,
        // eslint-disable-next-line
        track_total_hits: true
    };
    let response;
    try {
        response = await elasticSearch.search({
            ...utils.es(context),
            body
        });
    } catch (ex) {
        return new ListErrorResponse({
            code: ex.code || "ELASTICSEARCH_ERROR",
            message:
                ex.message === "index_not_found_exception"
                    ? "You must run the install mutation to create the Elasticsearch index."
                    : ex.message,
            data: ex
        });
    }
    /**
     * The response we get we transform to the one we can work with.
     */
    const { hits, total } = response.body.hits;
    const items = hits.map((item: any) => item._source);
    /**
     * If there are more records than requested size, remove the last one as it was not requested.
     * But it helps us to check if there are more records to be fetched.
     */
    const hasMoreItems = items.length > size;
    if (hasMoreItems) {
        items.pop();
    }
    const meta = {
        hasMoreItems,
        totalCount: total.value,
        cursor: items.length > 0 ? encodeElasticsearchCursor(hits[items.length - 1].sort) : null
    };

    return new ListResponse(items, meta);
};

export default listCarManufacturers;

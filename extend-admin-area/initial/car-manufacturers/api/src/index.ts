import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/types";
import { ApplicationContext } from "./types";
import graphql from "./graphql";
import {
    getCarManufacturer,
    isInstalled,
    listCarManufacturers,
    install,
    uninstall,
    createCarManufacturer,
    updateCarManufacturer,
    deleteCarManufacturer
} from "./resolvers";

const emptyResolver = () => ({});

export default (): GraphQLSchemaPlugin<ApplicationContext> => ({
    type: "graphql-schema",
    name: "graphql-schema-carManufacturer",
    schema: {
        /**
         * Schema definition for the GraphQL API.
         */
        typeDefs: graphql,
        resolvers: {
            Query: {
                carManufacturers: emptyResolver
            },
            Mutation: {
                carManufacturers: emptyResolver
            },
            CarManufacturerQuery: {
                /**
                 * Get a single carManufacturer by ID.
                 */
                getCarManufacturer,
                /**
                 * List carManufacturers.
                 * Can be filtered with where argument.
                 * Can be sorted with sort argument.
                 */
                listCarManufacturers,
                /**
                 * Check if Elasticsearch index is created.
                 * Can be removed if Elasticsearch will not be used.
                 */
                isInstalled
            },
            CarManufacturerMutation: {
                /**
                 * Create the Elasticsearch index.
                 * Can be removed if Elasticsearch will not be used.
                 */
                install,
                /**
                 * Delete the Elasticsearch index.
                 * Can be removed if Elasticsearch will not be used.
                 */
                uninstall,
                /**
                 * Store a single carManufacturer into the database.
                 * It also stores into the Elasticsearch - if not removed.
                 */
                createCarManufacturer,
                /**
                 * Store a single existing carManufacturer into the database.
                 * It also stores into the Elasticsearch - if not removed.
                 */
                updateCarManufacturer,
                /**
                 * Delete a single existing carManufacturer from the database.
                 * It also deletes from the Elasticsearch - if not removed.
                 */
                deleteCarManufacturer
            }
        }
    }
});

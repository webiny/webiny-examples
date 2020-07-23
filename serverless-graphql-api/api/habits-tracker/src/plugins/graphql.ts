import gql from "graphql-tag";
import { GraphQLSchemaPlugin } from "@webiny/graphql/types";
import { hasScope } from "@webiny/api-security";
import {
    emptyResolver,
    resolveCreate,
    resolveDelete,
    resolveGet,
    resolveList,
    resolveUpdate
} from "@webiny/commodo-graphql";

const habitFetcher = ctx => ctx.models.Habit;

/**
 * As the name itself suggests, the "graphql-schema" plugin enables us to define our service's GraphQL schema.
 * Use the "schema" and "resolvers" properties to define GraphQL types and resolvers, respectively.
 * Resolvers can be made from scratch, but to make it a bit easier, we rely on a couple of built-in generic
 * resolvers, imported from the "@webiny/commodo-graphql" package.
 *
 * @see https://docs.webiny.com/docs/api-development/graphql
 */
const plugin: GraphQLSchemaPlugin = {
    type: "graphql-schema",
    name: "graphql-schema-habits",
    schema: {
        typeDefs: gql`
            type HabitDeleteResponse {
                data: Boolean
                error: HabitError
            }

            type HabitCursors {
                next: String
                previous: String
            }

            type HabitListMeta {
                cursors: HabitCursors
                hasNextPage: Boolean
                hasPreviousPage: Boolean
                totalCount: Int
            }

            type HabitError {
                code: String
                message: String
                data: JSON
            }

            type Habit {
                id: ID
                title: String
                habitScore: Number
                description: String
                createdOn: DateTime
            }

            input HabitInput {
                id: ID
                title: String!
                habitScore: Number
                description: String
            }

            input HabitListWhere {
                title: String
                habitScore: Number
            }

            input HabitListSort {
                title: Int
                habitScore: Number
                createdOn: Int
            }

            type HabitResponse {
                data: Habit
                error: HabitError
            }

            type HabitListResponse {
                data: [Habit]
                meta: HabitListMeta
                error: HabitError
            }

            type HabitQuery {
                getHabit(id: ID): HabitResponse

                listHabits(
                    where: HabitListWhere
                    sort: HabitListSort
                    limit: Int
                    after: String
                    before: String
                ): HabitListResponse
            }

            type HabitMutation {
                createHabit(data: HabitInput!): HabitResponse

                updateHabit(id: ID!, data: HabitInput!): HabitResponse

                deleteHabit(id: ID!): HabitDeleteResponse
            }

            extend type Query {
                habits: HabitQuery
            }

            extend type Mutation {
                habits: HabitMutation
            }
        `,
        resolvers: {
            Query: {
                // Needs to be here, otherwise the resolvers below cannot return any result.
                habits: emptyResolver
            },
            Mutation: {
                // Needs to be here, otherwise the resolvers below cannot return any result.
                habits: emptyResolver
            },
            HabitQuery: {
                // With the generic resolvers, we also rely on the "hasScope" helper function from the
                // "@webiny/api-security" package, in order to define the required security scopes (permissions).
                getHabit: hasScope("habits:get")(resolveGet(habitFetcher)),
                listHabits: hasScope("habits:list")(resolveList(habitFetcher))
            },
            HabitMutation: {
                // With the generic resolvers, we also rely on the "hasScope" helper function from the
                // "@webiny/api-security" package, in order to define the required security scopes (permissions).
                createHabit: hasScope("habits:create")(resolveCreate(habitFetcher)),
                updateHabit: hasScope("habits:update")(resolveUpdate(habitFetcher)),
                deleteHabit: hasScope("habits:delete")(resolveDelete(habitFetcher))
            }
        }
    }
};

export default plugin;

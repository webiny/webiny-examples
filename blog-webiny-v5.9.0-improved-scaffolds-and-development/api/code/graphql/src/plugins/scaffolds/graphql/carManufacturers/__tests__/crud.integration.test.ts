import { handler } from "~/index";
import {
    GET_CAR_MANUFACTURER,
    CREATE_CAR_MANUFACTURER,
    DELETE_CAR_MANUFACTURER,
    LIST_CAR_MANUFACTURERS,
    UPDATE_CAR_MANUFACTURER
} from "./graphql/carManufacturers";

/**
 * An example of an integration test. You can use these to test your GraphQL resolvers, for example,
 * ensure they are correctly interacting with the database and other cloud infrastructure resources
 * and services. These tests provide a good level of confidence that our application is working, and
 * can be reasonably fast to complete.
 * https://www.webiny.com/docs/how-to-guides/webiny-cli/scaffolding/extend-graphql-api/testing/integration
 */

const query = ({ query = "", variables = {} } = {}) => {
    return handler({
        httpMethod: "POST",
        headers: {},
        body: JSON.stringify({
            query,
            variables
        })
    }).then(response => JSON.parse(response.body));
};

let testCarManufacturers = [];

describe("CarManufacturers CRUD tests (integration)", () => {
    beforeEach(async () => {
        for (let i = 0; i < 3; i++) {
            testCarManufacturers.push(
                await query({
                    query: CREATE_CAR_MANUFACTURER,
                    variables: {
                        data: {
                            title: `CarManufacturer ${i}`,
                            description: `CarManufacturer ${i}'s description.`
                        }
                    }
                }).then(response => response.data.carManufacturers.createCarManufacturer)
            );
        }
    });

    afterEach(async () => {
        for (let i = 0; i < 3; i++) {
            await query({
                query: DELETE_CAR_MANUFACTURER,
                variables: {
                    id: testCarManufacturers[i].id
                }
            });
        }
        testCarManufacturers = [];
    });

    it("should be able to perform basic CRUD operations", async () => {
        // 1. Now that we have carManufacturers created, let's see if they come up in a basic listCarManufacturers query.
        const [carManufacturer0, carManufacturer1, carManufacturer2] = testCarManufacturers;

        await query({ query: LIST_CAR_MANUFACTURERS }).then(response =>
            expect(response.data.carManufacturers.listCarManufacturers).toEqual({
                data: [carManufacturer2, carManufacturer1, carManufacturer0],
                meta: {
                    after: null,
                    before: null,
                    limit: 10
                }
            })
        );

        // 2. Delete carManufacturer 1.
        await query({
            query: DELETE_CAR_MANUFACTURER,
            variables: {
                id: carManufacturer1.id
            }
        });

        await query({
            query: LIST_CAR_MANUFACTURERS
        }).then(response =>
            expect(response.data.carManufacturers.listCarManufacturers).toEqual({
                data: [carManufacturer2, carManufacturer0],
                meta: {
                    after: null,
                    before: null,
                    limit: 10
                }
            })
        );

        // 3. Update carManufacturer 0.
        await query({
            query: UPDATE_CAR_MANUFACTURER,
            variables: {
                id: carManufacturer0.id,
                data: {
                    title: "CarManufacturer 0 - UPDATED",
                    description: `CarManufacturer 0's description - UPDATED.`
                }
            }
        }).then(response =>
            expect(response.data.carManufacturers.updateCarManufacturer).toEqual({
                id: carManufacturer0.id,
                title: "CarManufacturer 0 - UPDATED",
                description: `CarManufacturer 0's description - UPDATED.`
            })
        );

        // 5. Get carManufacturer 0 after the update.
        await query({
            query: GET_CAR_MANUFACTURER,
            variables: { id: carManufacturer0.id }
        }).then(response =>
            expect(response.data.carManufacturers.getCarManufacturer).toEqual({
                id: carManufacturer0.id,
                title: "CarManufacturer 0 - UPDATED",
                description: `CarManufacturer 0's description - UPDATED.`
            })
        );
    });

    test("should be able to use cursor-based pagination (desc)", async () => {
        const [carManufacturer0, carManufacturer1, carManufacturer2] = testCarManufacturers;

        await query({
            query: LIST_CAR_MANUFACTURERS,
            variables: {
                limit: 2
            }
        }).then(response =>
            expect(response.data.carManufacturers.listCarManufacturers).toEqual({
                data: [carManufacturer2, carManufacturer1],
                meta: {
                    after: carManufacturer1.id,
                    before: null,
                    limit: 2
                }
            })
        );

        await query({
            query: LIST_CAR_MANUFACTURERS,
            variables: {
                limit: 2,
                after: carManufacturer1.id
            }
        }).then(response =>
            expect(response.data.carManufacturers.listCarManufacturers).toEqual({
                data: [carManufacturer0],
                meta: {
                    before: carManufacturer0.id,
                    after: null,
                    limit: 2
                }
            })
        );

        await query({
            query: LIST_CAR_MANUFACTURERS,
            variables: {
                limit: 2,
                before: carManufacturer0.id
            }
        }).then(response =>
            expect(response.data.carManufacturers.listCarManufacturers).toEqual({
                data: [carManufacturer2, carManufacturer1],
                meta: {
                    after: carManufacturer1.id,
                    before: null,
                    limit: 2
                }
            })
        );
    });

    test("should be able to use cursor-based pagination (ascending)", async () => {
        const [carManufacturer0, carManufacturer1, carManufacturer2] = testCarManufacturers;

        await query({
            query: LIST_CAR_MANUFACTURERS,
            variables: {
                limit: 2,
                sort: "createdOn_ASC"
            }
        }).then(response =>
            expect(response.data.carManufacturers.listCarManufacturers).toEqual({
                data: [carManufacturer0, carManufacturer1],
                meta: {
                    after: carManufacturer1.id,
                    before: null,
                    limit: 2
                }
            })
        );

        await query({
            query: LIST_CAR_MANUFACTURERS,
            variables: {
                limit: 2,
                sort: "createdOn_ASC",
                after: carManufacturer1.id
            }
        }).then(response =>
            expect(response.data.carManufacturers.listCarManufacturers).toEqual({
                data: [carManufacturer2],
                meta: {
                    before: carManufacturer2.id,
                    after: null,
                    limit: 2
                }
            })
        );

        await query({
            query: LIST_CAR_MANUFACTURERS,
            variables: {
                limit: 2,
                sort: "createdOn_ASC",
                before: carManufacturer2.id
            }
        }).then(response =>
            expect(response.data.carManufacturers.listCarManufacturers).toEqual({
                data: [carManufacturer0, carManufacturer1],
                meta: {
                    after: carManufacturer1.id,
                    before: null,
                    limit: 2
                }
            })
        );
    });
});

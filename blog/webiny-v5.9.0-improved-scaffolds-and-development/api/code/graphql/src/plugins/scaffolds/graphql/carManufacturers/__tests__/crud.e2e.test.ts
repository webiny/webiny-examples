import {
    GET_CAR_MANUFACTURER,
    CREATE_CAR_MANUFACTURER,
    DELETE_CAR_MANUFACTURER,
    LIST_CAR_MANUFACTURERS,
    UPDATE_CAR_MANUFACTURER
} from "./graphql/carManufacturers";
import { request } from "graphql-request";

/**
 * An example of an end-to-end (E2E) test. You can use these to test if the overall cloud infrastructure
 * setup is working. That's why, here we're not executing the handler code directly, but issuing real
 * HTTP requests over to the deployed Amazon Cloudfront distribution. These tests provide the highest
 * level of confidence that our application is working, but they take more time in order to complete.
 * https://www.webiny.com/docs/how-to-guides/webiny-cli/scaffolding/extend-graphql-api/testing/e2e
 */

const query = async ({ query = "", variables = {} } = {}) => {
    return request(process.env.API_URL + "/graphql", query, variables);
};

let testCarManufacturers = [];

describe("CarManufacturers CRUD tests (end-to-end)", () => {
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
                }).then(response => response.carManufacturers.createCarManufacturer)
            );
        }
    });

    afterEach(async () => {
        for (let i = 0; i < 3; i++) {
            try {
                await query({
                    query: DELETE_CAR_MANUFACTURER,
                    variables: {
                        id: testCarManufacturers[i].id
                    }
                });
            } catch {
                // Some of the entries might've been deleted during runtime.
                // We can ignore thrown errors.
            }
        }
        testCarManufacturers = [];
    });

    it("should be able to perform basic CRUD operations", async () => {
        // 1. Now that we have carManufacturers created, let's see if they come up in a basic listCarManufacturers query.
        const [carManufacturer0, carManufacturer1, carManufacturer2] = testCarManufacturers;

        await query({
            query: LIST_CAR_MANUFACTURERS,
            variables: { limit: 3 }
        }).then(response =>
            expect(response.carManufacturers.listCarManufacturers).toMatchObject({
                data: [carManufacturer2, carManufacturer1, carManufacturer0],
                meta: {
                    limit: 3
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
            query: LIST_CAR_MANUFACTURERS,
            variables: {
                limit: 2
            }
        }).then(response =>
            expect(response.carManufacturers.listCarManufacturers).toMatchObject({
                data: [carManufacturer2, carManufacturer0],
                meta: {
                    limit: 2
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
            expect(response.carManufacturers.updateCarManufacturer).toEqual({
                id: carManufacturer0.id,
                title: "CarManufacturer 0 - UPDATED",
                description: `CarManufacturer 0's description - UPDATED.`
            })
        );

        // 4. Get carManufacturer 0 after the update.
        await query({
            query: GET_CAR_MANUFACTURER,
            variables: {
                id: carManufacturer0.id
            }
        }).then(response =>
            expect(response.carManufacturers.getCarManufacturer).toEqual({
                id: carManufacturer0.id,
                title: "CarManufacturer 0 - UPDATED",
                description: `CarManufacturer 0's description - UPDATED.`
            })
        );
    });
});

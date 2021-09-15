import { GET_PIN, CREATE_PIN, DELETE_PIN, LIST_PINS, UPDATE_PIN } from "./graphql/pins";
import { request } from "graphql-request";

/**
 * An example of an end-to-end (E2E) test. You can use these to test if the overall cloud infrastructure
 * setup is working. That's why, here we're not executing the handler code directly, but issuing real
 * HTTP requests over to the deployed Amazon Cloudfront distribution. These tests provide the highest
 * level of confidence that our application is working, but they take more time in order to complete.
 * https://www.webiny.com/docs/how-to-guides/scaffolding/extend-graphql-api#crude2etestts
 */

const query = async ({ query = "", variables = {} } = {}) => {
    return request(process.env.API_URL + "/graphql", query, variables);
};

let testPins = [];

describe("Pins CRUD tests (end-to-end)", () => {
    beforeEach(async () => {
        for (let i = 0; i < 3; i++) {
            testPins.push(
                await query({
                    query: CREATE_PIN,
                    variables: {
                        data: {
                            title: `Pin ${i}`,
                            description: `Pin ${i}'s description.`
                        }
                    }
                }).then(response => response.pins.createPin)
            );
        }
    });

    afterEach(async () => {
        for (let i = 0; i < 3; i++) {
            try {
                await query({
                    query: DELETE_PIN,
                    variables: {
                        id: testPins[i].id
                    }
                });
            } catch {
                // Some of the entries might've been deleted during runtime.
                // We can ignore thrown errors.
            }
        }
        testPins = [];
    });

    it("should be able to perform basic CRUD operations", async () => {
        // 1. Now that we have pins created, let's see if they come up in a basic listPins query.
        const [pin0, pin1, pin2] = testPins;

        await query({
            query: LIST_PINS,
            variables: { limit: 3 }
        }).then(response =>
            expect(response.pins.listPins).toMatchObject({
                data: [pin2, pin1, pin0],
                meta: {
                    limit: 3
                }
            })
        );

        // 2. Delete pin 1.
        await query({
            query: DELETE_PIN,
            variables: {
                id: pin1.id
            }
        });

        await query({
            query: LIST_PINS,
            variables: {
                limit: 2
            }
        }).then(response =>
            expect(response.pins.listPins).toMatchObject({
                data: [pin2, pin0],
                meta: {
                    limit: 2
                }
            })
        );

        // 3. Update pin 0.
        await query({
            query: UPDATE_PIN,
            variables: {
                id: pin0.id,
                data: {
                    title: "Pin 0 - UPDATED",
                    description: `Pin 0's description - UPDATED.`
                }
            }
        }).then(response =>
            expect(response.pins.updatePin).toEqual({
                id: pin0.id,
                title: "Pin 0 - UPDATED",
                description: `Pin 0's description - UPDATED.`
            })
        );

        // 4. Get pin 0 after the update.
        await query({
            query: GET_PIN,
            variables: {
                id: pin0.id
            }
        }).then(response =>
            expect(response.pins.getPin).toEqual({
                id: pin0.id,
                title: "Pin 0 - UPDATED",
                description: `Pin 0's description - UPDATED.`
            })
        );
    });
});

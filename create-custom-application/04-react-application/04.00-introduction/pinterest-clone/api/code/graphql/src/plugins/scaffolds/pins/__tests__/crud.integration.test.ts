import { handler } from "~/index";
import { GET_PIN, CREATE_PIN, DELETE_PIN, LIST_PINS, UPDATE_PIN } from "./graphql/pins";

/**
 * An example of an integration test. You can use these to test your GraphQL resolvers, for example,
 * ensure they are correctly interacting with the database and other cloud infrastructure resources
 * and services. These tests provide a good level of confidence that our application is working, and
 * can be reasonably fast to complete.
 * https://www.webiny.com/docs/how-to-guides/scaffolding/extend-graphql-api#crudintegrationtestts
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

let testPins = [];

describe("Pins CRUD tests (integration)", () => {
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
                }).then(response => response.data.pins.createPin)
            );
        }
    });

    afterEach(async () => {
        for (let i = 0; i < 3; i++) {
            await query({
                query: DELETE_PIN,
                variables: {
                    id: testPins[i].id
                }
            });
        }
        testPins = [];
    });

    it("should be able to perform basic CRUD operations", async () => {
        // 1. Now that we have pins created, let's see if they come up in a basic listPins query.
        const [pin0, pin1, pin2] = testPins;

        await query({ query: LIST_PINS }).then(response =>
            expect(response.data.pins.listPins).toEqual({
                data: [pin2, pin1, pin0],
                meta: {
                    after: null,
                    before: null,
                    limit: 10
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
            query: LIST_PINS
        }).then(response =>
            expect(response.data.pins.listPins).toEqual({
                data: [pin2, pin0],
                meta: {
                    after: null,
                    before: null,
                    limit: 10
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
            expect(response.data.pins.updatePin).toEqual({
                id: pin0.id,
                title: "Pin 0 - UPDATED",
                description: `Pin 0's description - UPDATED.`
            })
        );

        // 5. Get pin 0 after the update.
        await query({
            query: GET_PIN,
            variables: { id: pin0.id }
        }).then(response =>
            expect(response.data.pins.getPin).toEqual({
                id: pin0.id,
                title: "Pin 0 - UPDATED",
                description: `Pin 0's description - UPDATED.`
            })
        );
    });

    test("should be able to use cursor-based pagination (desc)", async () => {
        const [pin0, pin1, pin2] = testPins;

        await query({
            query: LIST_PINS,
            variables: {
                limit: 2
            }
        }).then(response =>
            expect(response.data.pins.listPins).toEqual({
                data: [pin2, pin1],
                meta: {
                    after: pin1.id,
                    before: null,
                    limit: 2
                }
            })
        );

        await query({
            query: LIST_PINS,
            variables: {
                limit: 2,
                after: pin1.id
            }
        }).then(response =>
            expect(response.data.pins.listPins).toEqual({
                data: [pin0],
                meta: {
                    before: pin0.id,
                    after: null,
                    limit: 2
                }
            })
        );

        await query({
            query: LIST_PINS,
            variables: {
                limit: 2,
                before: pin0.id
            }
        }).then(response =>
            expect(response.data.pins.listPins).toEqual({
                data: [pin2, pin1],
                meta: {
                    after: pin1.id,
                    before: null,
                    limit: 2
                }
            })
        );
    });

    test("should be able to use cursor-based pagination (ascending)", async () => {
        const [pin0, pin1, pin2] = testPins;

        await query({
            query: LIST_PINS,
            variables: {
                limit: 2,
                sort: "createdOn_ASC"
            }
        }).then(response =>
            expect(response.data.pins.listPins).toEqual({
                data: [pin0, pin1],
                meta: {
                    after: pin1.id,
                    before: null,
                    limit: 2
                }
            })
        );

        await query({
            query: LIST_PINS,
            variables: {
                limit: 2,
                sort: "createdOn_ASC",
                after: pin1.id
            }
        }).then(response =>
            expect(response.data.pins.listPins).toEqual({
                data: [pin2],
                meta: {
                    before: pin2.id,
                    after: null,
                    limit: 2
                }
            })
        );

        await query({
            query: LIST_PINS,
            variables: {
                limit: 2,
                sort: "createdOn_ASC",
                before: pin2.id
            }
        }).then(response =>
            expect(response.data.pins.listPins).toEqual({
                data: [pin0, pin1],
                meta: {
                    after: pin1.id,
                    before: null,
                    limit: 2
                }
            })
        );
    });
});

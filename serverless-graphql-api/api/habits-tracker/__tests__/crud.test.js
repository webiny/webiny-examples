import useGqlHandler from "./useGqlHandler";
import { CREATE_HABIT, LIST_HABITS } from "./graphql/habits";

/**
 * This is a simple test that asserts basic CRUD operations work as expected.
 * Feel free to update this test according to changes you made in the actual code.
 *
 * @see https://docs.webiny.com/docs/api-development/introduction
 */
describe("CRUD Test", () => {
    const { invoke } = useGqlHandler();

    it("should be able to perform basic CRUD operations", async () => {
        // 1. Let's create a couple of habits.
        let [habit1] = await invoke({
            body: {
                query: CREATE_HABIT,
                variables: {
                    data: {
                        title: "Habit 1",
                        description: "This is my 1st habit.",
                        habitScore: 1
                    }
                }
            }
        });

        let [habit2] = await invoke({
            body: {
                query: CREATE_HABIT,
                variables: {
                    data: { title: "Habit 2", description: "This is my 2nd habit." }
                }
            }
        });

        let [habit3] = await invoke({
            body: {
                query: CREATE_HABIT,
                variables: {
                    data: { title: "Habit 3", habitScore: 3 }
                }
            }
        });

        // 2. Now that we have habits created, let's see if they come up in a basic listHabits query.
        let [habitsList] = await invoke({
            body: {
                query: LIST_HABITS
            }
        });

        expect(habitsList).toEqual({
            data: {
                habits: {
                    listHabits: {
                        data: [
                            {
                                id: habit3.data.habits.createHabit.data.id,
                                title: "Habit 3",
                                description: null,
                                habitScore: 3
                            },
                            {
                                id: habit2.data.habits.createHabit.data.id,
                                title: "Habit 2",
                                description: "This is my 2nd habit.",
                                habitScore: null
                            },
                            {
                                id: habit1.data.habits.createHabit.data.id,
                                title: "Habit 1",
                                description: "This is my 1st habit.",
                                habitScore: 1
                            }
                        ],
                        error: null
                    }
                }
            }
        });
    });

    it("should throw a validation error if title is invalid", async () => {
        // The title field is missing, the error should be thrown from the GraphQL and the resolver won't be executedd.
        let [body] = await invoke({
            body: {
                query: CREATE_HABIT,
                variables: {
                    data: { description: "This is my 1st habit.", habitScore: null }
                }
            }
        });

        let [error] = body.errors;
        expect(error.message).toBe(
            'Variable "$data" got invalid value { description: "This is my 1st habit.", habitScore: null }; Field title of required type String! was not provided.'
        );

        // Even though the title is provided, it is still too short (because of the validation
        // set on the "Habit" Commodo model).
        [body] = await invoke({
            body: {
                query: CREATE_HABIT,
                variables: {
                    data: { title: "Aa", description: "This is my 1st habit.", habitScore: null }
                }
            }
        });

        expect(body).toEqual({
            data: {
                habits: {
                    createHabit: {
                        data: null,
                        error: {
                            code: "VALIDATION_FAILED_INVALID_FIELDS",
                            message: "Validation failed.",
                            data: {
                                invalidFields: {
                                    title: "Value requires at least 3 characters."
                                }
                            }
                        }
                    }
                }
            }
        });
    });
});

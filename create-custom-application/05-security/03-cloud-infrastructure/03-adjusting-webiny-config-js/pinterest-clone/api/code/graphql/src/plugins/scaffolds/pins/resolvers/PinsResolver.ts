import { Context } from "~/types";

export default class PinsResolver {
    protected readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    /**
     * Generates primary key (PK), to be used upon mutating / querying DynamoDB data.
     * @param base
     */
    getPK(base = "Pin") {
        // In integration test environments, we use the `process.env.TEST_RUN_ID` as a suffix.
        // This helps us isolate the created test data and perform assertions in our tests.
        if (process.env.TEST_RUN_ID) {
            base += "_TEST_RUN_" + process.env.TEST_RUN_ID;
        }

        return base;
    }
}

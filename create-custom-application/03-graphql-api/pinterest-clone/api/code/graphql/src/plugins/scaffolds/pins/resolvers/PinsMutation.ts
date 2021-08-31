import { PinEntity } from "../types";
import mdbid from "mdbid";
import { Pin } from "../entities";
import PinsResolver from "./PinsResolver";

/**
 * Contains base `createPin`, `updatePin`, and `deletePin` GraphQL resolver functions.
 * Feel free to adjust the code to your needs. Also, note that at some point in time, you will
 * most probably want to implement custom data validation and security-related checks.
 * https://www.webiny.com/docs/how-to-guides/scaffolding/extend-graphql-api#essential-files
 */

interface CreatePinParams {
    data: {
        title: string;
        description?: string;
    };
}

interface UpdatePinParams {
    id: string;
    data: {
        title: string;
        description?: string;
    };
}

interface DeletePinParams {
    id: string;
}

interface PinsMutation {
    createPin(params: CreatePinParams): Promise<PinEntity>;
    updatePin(params: UpdatePinParams): Promise<PinEntity>;
    deletePin(params: DeletePinParams): Promise<PinEntity>;
}

/**
 * To define our GraphQL resolvers, we are using the "class method resolvers" approach.
 * https://www.graphql-tools.com/docs/resolvers#class-method-resolvers
 */
export default class PinsMutationResolver extends PinsResolver implements PinsMutation {
    /**
     * Creates and returns a new Pin entry.
     * @param data
     */
    async createPin({ data }: CreatePinParams) {
        // If our GraphQL API uses Webiny Security Framework, we can retrieve the
        // currently logged in identity and assign it to the `createdBy` property.
        // https://www.webiny.com/docs/key-topics/security-framework/introduction
        // const { security } = this.context;

        // We use `mdbid` (https://www.npmjs.com/package/mdbid) library to generate
        // a random, unique, and sequential (sortable) ID for our new entry.
        const id = mdbid();

        // const identity = await security.getIdentity();
        const pin = {
            ...data,
            PK: this.getPK(),
            SK: id,
            id,
            createdOn: new Date().toISOString(),
            savedOn: new Date().toISOString(),
            /* createdBy: identity && {
                id: identity.id,
                type: identity.type,
                displayName: identity.displayName
            }, */
            webinyVersion: process.env.WEBINY_VERSION
        };

        // Will throw an error if something goes wrong.
        await Pin.put(pin);

        return pin;
    }

    /**
     * Updates and returns an existing Pin entry.
     * @param id
     * @param data
     */
    async updatePin({ id, data }: UpdatePinParams) {
        // If entry is not found, we throw an error.
        const { Item: pin } = await Pin.get({ PK: this.getPK(), SK: id });
        if (!pin) {
            throw new Error(`Pin "${id}" not found.`);
        }

        const updatedPin = { ...pin, ...data };

        // Will throw an error if something goes wrong.
        await Pin.update(updatedPin);

        return updatedPin;
    }

    /**
     * Deletes and returns an existing Pin entry.
     * @param id
     */
    async deletePin({ id }: DeletePinParams) {
        // If entry is not found, we throw an error.
        const { Item: pin } = await Pin.get({ PK: this.getPK(), SK: id });
        if (!pin) {
            throw new Error(`Pin "${id}" not found.`);
        }

        // Will throw an error if something goes wrong.
        await Pin.delete(pin);

        return pin;
    }
}

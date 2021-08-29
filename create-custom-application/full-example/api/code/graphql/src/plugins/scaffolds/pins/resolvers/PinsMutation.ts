import { PinEntity } from "../types";
import mdbid from "mdbid";
import { Pin } from "../entities";
import PinsResolver from "./PinsResolver";
import { createPresignedPostPayload } from "~/plugins/scaffolds/pins/utils";

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

type CreatePreSignedPostPayloadParams = Record<string, any>;
type CreatePreSignedPostPayloadResponse = Record<string, any>;

interface PinsMutation {
    createPin(params: CreatePinParams): Promise<PinEntity>;
    updatePin(params: UpdatePinParams): Promise<PinEntity>;
    deletePin(params: DeletePinParams): Promise<PinEntity>;
    createPreSignedPostPayload(
        params: CreatePreSignedPostPayloadParams
    ): Promise<CreatePreSignedPostPayloadResponse>;
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
        const { security } = this.context;
        const identity = await security.getIdentity();
        if (!identity) {
            throw new Error("Not authenticated.");
        }

        // We use `mdbid` (https://www.npmjs.com/package/mdbid) library to generate
        // a random, unique, and sequential (sortable) ID for our new entry.
        const id = mdbid();

        const pin = {
            ...data,
            PK: this.getPK(),
            SK: id,
            id,
            createdOn: new Date().toISOString(),
            savedOn: new Date().toISOString(),
            createdBy: identity && {
                id: identity.id,
                type: identity.type,
                displayName: identity.displayName
            },
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
        // If our GraphQL API uses Webiny Security Framework, we can retrieve the
        // currently logged in identity and assign it to the `createdBy` property.
        // https://www.webiny.com/docs/key-topics/security-framework/introduction
        const { security } = this.context;
        const identity = await security.getIdentity();
        if (!identity) {
            throw new Error("Not authenticated.");
        }

        // If entry is not found, we throw an error.
        const { Item: pin } = await Pin.get({ PK: this.getPK(), SK: id });
        if (!pin) {
            throw new Error(`Pin "${id}" not found.`);
        }

        if (pin.createdBy.id !== identity.id) {
            throw new Error(`Cannot update pins you do not own.`);
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
        // If our GraphQL API uses Webiny Security Framework, we can retrieve the
        // currently logged in identity and assign it to the `createdBy` property.
        // https://www.webiny.com/docs/key-topics/security-framework/introduction
        const { security } = this.context;
        const identity = await security.getIdentity();
        if (!identity) {
            throw new Error("Not authenticated.");
        }

        // If entry is not found, we throw an error.
        const { Item: pin } = await Pin.get({ PK: this.getPK(), SK: id });
        if (!pin) {
            throw new Error(`Pin "${id}" not found.`);
        }

        if (pin.createdBy.id !== identity.id) {
            throw new Error(`Cannot delete pins you do not own.`);
        }

        // Will throw an error if something goes wrong.
        await Pin.delete(pin);

        return pin;
    }

    async createPreSignedPostPayload(args) {
        const { security } = this.context;

        return createPresignedPostPayload({
            file: args.data,
            folder: `pins/${security.getIdentity().id}/cover`
        });
    }
}

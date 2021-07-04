import { CarManufacturerEntity } from "../types";
import mdbid from "mdbid";
import { CarManufacturer } from "../entities";
import CarManufacturersResolver from "./CarManufacturersResolver";

/**
 * Contains base `createCarManufacturer`, `updateCarManufacturer`, and `deleteCarManufacturer` GraphQL resolver functions.
 * Feel free to adjust the code to your needs. Also, note that at some point in time, you will
 * most probably want to implement custom data validation and security-related checks.
 * https://www.webiny.com/docs/how-to-guides/webiny-cli/scaffolding/extend-graphql-api#essential-files
 */

interface CreateCarManufacturerParams {
    data: {
        title: string;
        description?: string;
    };
}

interface UpdateCarManufacturerParams {
    id: string;
    data: {
        title: string;
        description?: string;
    };
}

interface DeleteCarManufacturerParams {
    id: string;
}

interface CarManufacturersMutation {
    createCarManufacturer(params: CreateCarManufacturerParams): Promise<CarManufacturerEntity>;
    updateCarManufacturer(params: UpdateCarManufacturerParams): Promise<CarManufacturerEntity>;
    deleteCarManufacturer(params: DeleteCarManufacturerParams): Promise<CarManufacturerEntity>;
}

/**
 * To define our GraphQL resolvers, we are using the "class method resolvers" approach.
 * https://www.graphql-tools.com/docs/resolvers#class-method-resolvers
 */
export default class CarManufacturersMutationResolver extends CarManufacturersResolver
    implements CarManufacturersMutation {
    /**
     * Creates and returns a new CarManufacturer entry.
     * @param data
     */
    async createCarManufacturer({ data }: CreateCarManufacturerParams) {
        const { security } = this.context;

        // We use `mdbid` (https://www.npmjs.com/package/mdbid) library to generate
        // a random, unique, and sequential (sortable) ID for our new entry.
        const id = mdbid();

        const identity = await security.getIdentity();
        const carManufacturer = {
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
        await CarManufacturer.put(carManufacturer);

        return carManufacturer;
    }

    /**
     * Updates and returns an existing CarManufacturer entry.
     * @param id
     * @param data
     */
    async updateCarManufacturer({ id, data }: UpdateCarManufacturerParams) {
        // If entry is not found, we throw an error.
        const { Item: carManufacturer } = await CarManufacturer.get({ PK: this.getPK(), SK: id });
        if (!carManufacturer) {
            throw new Error(`CarManufacturer "${id}" not found.`);
        }

        const updatedCarManufacturer = { ...carManufacturer, ...data };

        // Will throw an error if something goes wrong.
        await CarManufacturer.update(updatedCarManufacturer);

        return updatedCarManufacturer;
    }

    /**
     * Deletes and returns an existing CarManufacturer entry.
     * @param id
     */
    async deleteCarManufacturer({ id }: DeleteCarManufacturerParams) {
        // If entry is not found, we throw an error.
        const { Item: carManufacturer } = await CarManufacturer.get({ PK: this.getPK(), SK: id });
        if (!carManufacturer) {
            throw new Error(`CarManufacturer "${id}" not found.`);
        }

        // Will throw an error if something goes wrong.
        await CarManufacturers.delete(carManufacturer);

        return carManufacturer;
    }
}

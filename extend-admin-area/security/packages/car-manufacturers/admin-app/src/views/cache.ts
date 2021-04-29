import dotProp from "dot-prop-immutable";
import { LIST_CAR_MANUFACTURERS } from "./graphql";

export const addToListCache = (cache, variables, carManufacturer) => {
    const gqlParams = { query: LIST_CAR_MANUFACTURERS, variables };

    let result;
    try {
        result = cache.readQuery(gqlParams);
    } catch {
        return;
    }
    const { carManufacturers } = result;

    cache.writeQuery({
        ...gqlParams,
        data: {
            carManufacturers: dotProp.set(carManufacturers, `listCarManufacturers.data`, [carManufacturer, ...carManufacturers.listCarManufacturers.data])
        }
    });
};

export const updateToListCache = (cache, variables, carManufacturer) => {
    const gqlParams = { query: LIST_CAR_MANUFACTURERS, variables };

    let result;
    try {
        result = cache.readQuery(gqlParams);
    } catch {
        return;
    }
    const { carManufacturers } = result;

    const index = carManufacturers.listCarManufacturers.data.findIndex(item => item.id === carManufacturer.id);

    cache.writeQuery({
        ...gqlParams,
        data: {
            carManufacturers: dotProp.set(carManufacturers, `listCarManufacturers.data.${index}`, carManufacturer)
        }
    });
};

export const removeFromListCache = (cache, variables, carManufacturer) => {
    const gqlParams = { query: LIST_CAR_MANUFACTURERS, variables };

    let result;
    try {
        result = cache.readQuery(gqlParams);
    } catch {
        return;
    }
    const { carManufacturers } = result;

    const index = carManufacturers.listCarManufacturers.data.findIndex(item => item.id === carManufacturer.id);

    cache.writeQuery({
        ...gqlParams,
        data: {
            carManufacturers: dotProp.delete(carManufacturers, `listCarManufacturers.data.${index}`)
        }
    });
};

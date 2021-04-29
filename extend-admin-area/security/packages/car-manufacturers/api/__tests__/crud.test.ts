import useGqlHandler from "./useGqlHandler";
import {
    GET_CAR_MANUFACTURER,
    CREATE_CAR_MANUFACTURER,
    DELETE_CAR_MANUFACTURER,
    LIST_CAR_MANUFACTURERS,
    UPDATE_CAR_MANUFACTURER
} from "./graphql/carManufacturers";

const carManufacturersData = {
    carManufacturer1: {
        title: "CarManufacturer 1",
        description: "This is my 1st carManufacturer.",
        isNice: false
    },
    carManufacturer2: {
        title: "CarManufacturer 2",
        description: "This is my 2nd carManufacturer with isNice put to default (false)."
    },
    carManufacturer3: {
        title: "CarManufacturer 3",
        isNice: true
    }
};
/**
 * This is a simple test that asserts basic CRUD operations work as expected.
 * Feel free to update this test according to changes you made in the actual code.
 *
 * @see https://docs.webiny.com/docs/api-development/introduction
 */
describe("CRUD Test", () => {
    const {
        until,
        invoke,
        clearElasticsearchIndices,
        createElasticsearchIndices
    } = useGqlHandler();

    beforeEach(async () => {
        await clearElasticsearchIndices();
        await createElasticsearchIndices();
    });

    afterEach(async () => {
        await clearElasticsearchIndices();
    });

    const createCarManufacturer = async (data: Record<string, any>) => {
        return await invoke({
            body: {
                query: CREATE_CAR_MANUFACTURER,
                variables: {
                    data
                }
            }
        });
    };

    it("should be able to perform basic CRUD operations", async () => {
        // 1. Let's create a couple of carManufacturers.
        const [carManufacturer1] = await createCarManufacturer(carManufacturersData.carManufacturer1);
        const [carManufacturer2] = await createCarManufacturer(carManufacturersData.carManufacturer2);
        const [carManufacturer3] = await createCarManufacturer(carManufacturersData.carManufacturer3);

        // if this `until` resolves successfully, we know carManufacturers are propagated into elasticsearch
        await until(
            () =>
                invoke({
                    body: {
                        query: LIST_CAR_MANUFACTURERS
                    }
                }).then(([data]) => data),
            ({ data }) => data.carManufacturers.listCarManufacturers.data.length === 3,
            { name: "list after created carManufacturers" }
        );

        // 2. Now that we have carManufacturers created, let's see if they come up in a basic listCarManufacturers query.
        const [carManufacturersListResponse] = await invoke({
            body: {
                query: LIST_CAR_MANUFACTURERS
            }
        });

        expect(carManufacturersListResponse).toEqual({
            data: {
                carManufacturers: {
                    listCarManufacturers: {
                        data: [
                            {
                                id: carManufacturer3.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer3,
                                description: null
                            },
                            {
                                id: carManufacturer2.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer2,
                                isNice: false
                            },
                            {
                                id: carManufacturer1.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer1
                            }
                        ],
                        error: null
                    }
                }
            }
        });

        // 3. delete carManufacturer2
        const [deleteResponse] = await invoke({
            body: {
                query: DELETE_CAR_MANUFACTURER,
                variables: {
                    id: carManufacturer2.data.carManufacturers.createCarManufacturer.data.id
                }
            }
        });

        expect(deleteResponse).toEqual({
            data: {
                carManufacturers: {
                    deleteCarManufacturer: {
                        data: true,
                        error: null
                    }
                }
            }
        });

        // if this `until` resolves successfully, we know the deleted carManufacturer was deleted from elasticsearch
        await until(
            () =>
                invoke({
                    body: {
                        query: LIST_CAR_MANUFACTURERS
                    }
                }).then(([data]) => data),
            ({ data }) => data.carManufacturers.listCarManufacturers.data.length === 2,
            { name: "list after deleted carManufacturer" }
        );

        const [carManufacturerListAfterDeleteResponse] = await invoke({
            body: {
                query: LIST_CAR_MANUFACTURERS
            }
        });

        expect(carManufacturerListAfterDeleteResponse).toEqual({
            data: {
                carManufacturers: {
                    listCarManufacturers: {
                        data: [
                            {
                                id: carManufacturer3.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer3,
                                description: null
                            },
                            {
                                id: carManufacturer1.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer1
                            }
                        ],
                        error: null
                    }
                }
            }
        });

        // 4. update carManufacturer 1
        const [updateResponse] = await invoke({
            body: {
                query: UPDATE_CAR_MANUFACTURER,
                variables: {
                    id: carManufacturer1.data.carManufacturers.createCarManufacturer.data.id,
                    data: {
                        title: "CarManufacturer 1 - updated",
                        description: "This is my 1st carManufacturer. - updated",
                        isNice: true
                    }
                }
            }
        });

        expect(updateResponse).toEqual({
            data: {
                carManufacturers: {
                    updateCarManufacturer: {
                        data: {
                            id: carManufacturer1.data.carManufacturers.createCarManufacturer.data.id,
                            title: "CarManufacturer 1 - updated",
                            description: "This is my 1st carManufacturer. - updated",
                            isNice: true
                        },
                        error: null
                    }
                }
            }
        });

        // 5. get carManufacturer1 after the update
        const [getResponse] = await invoke({
            body: {
                query: GET_CAR_MANUFACTURER,
                variables: {
                    id: carManufacturer1.data.carManufacturers.createCarManufacturer.data.id
                }
            }
        });

        expect(getResponse).toEqual({
            data: {
                carManufacturers: {
                    getCarManufacturer: {
                        data: {
                            id: carManufacturer1.data.carManufacturers.createCarManufacturer.data.id,
                            title: "CarManufacturer 1 - updated",
                            description: "This is my 1st carManufacturer. - updated",
                            isNice: true
                        },
                        error: null
                    }
                }
            }
        });
    });

    test("should sort carManufacturers", async () => {
        // 1. Let's create a couple of carManufacturers.
        const [carManufacturer1] = await createCarManufacturer(carManufacturersData.carManufacturer1);
        const [carManufacturer2] = await createCarManufacturer(carManufacturersData.carManufacturer2);
        const [carManufacturer3] = await createCarManufacturer(carManufacturersData.carManufacturer3);

        // if this `until` resolves successfully, we know the deleted carManufacturer was deleted from elasticsearch
        await until(
            () =>
                invoke({
                    body: {
                        query: LIST_CAR_MANUFACTURERS
                    }
                }).then(([data]) => data),
            ({ data }) => data.carManufacturers.listCarManufacturers.data.length === 3,
            { name: "list carManufacturers" }
        );

        const [carManufacturersListResponse] = await invoke({
            body: {
                query: LIST_CAR_MANUFACTURERS,
                variables: {
                    sort: ["createdOn_ASC"]
                }
            }
        });

        expect(carManufacturersListResponse).toEqual({
            data: {
                carManufacturers: {
                    listCarManufacturers: {
                        data: [
                            {
                                id: carManufacturer1.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer1
                            },
                            {
                                id: carManufacturer2.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer2,
                                isNice: false
                            },
                            {
                                id: carManufacturer3.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer3,
                                description: null
                            }
                        ],
                        error: null
                    }
                }
            }
        });
    });

    test("should sort carManufacturers by title ASC", async () => {
        // 1. Let's create a couple of carManufacturers.
        const [carManufacturer1] = await createCarManufacturer(carManufacturersData.carManufacturer1);
        const [carManufacturer2] = await createCarManufacturer(carManufacturersData.carManufacturer2);
        const [carManufacturer3] = await createCarManufacturer(carManufacturersData.carManufacturer3);

        // if this `until` resolves successfully, we know the deleted carManufacturer was deleted from elasticsearch
        await until(
            () =>
                invoke({
                    body: {
                        query: LIST_CAR_MANUFACTURERS
                    }
                }).then(([data]) => data),
            ({ data }) => data.carManufacturers.listCarManufacturers.data.length === 3,
            { name: "list carManufacturers" }
        );

        const [carManufacturersListResponse] = await invoke({
            body: {
                query: LIST_CAR_MANUFACTURERS,
                variables: {
                    sort: ["title_ASC"]
                }
            }
        });

        expect(carManufacturersListResponse).toEqual({
            data: {
                carManufacturers: {
                    listCarManufacturers: {
                        data: [
                            {
                                id: carManufacturer1.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer1
                            },
                            {
                                id: carManufacturer2.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer2,
                                isNice: false
                            },
                            {
                                id: carManufacturer3.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer3,
                                description: null
                            }
                        ],
                        error: null
                    }
                }
            }
        });
    });

    test("should sort carManufacturers by title desc", async () => {
        // 1. Let's create a couple of carManufacturers.
        const [carManufacturer1] = await createCarManufacturer(carManufacturersData.carManufacturer1);
        const [carManufacturer2] = await createCarManufacturer(carManufacturersData.carManufacturer2);
        const [carManufacturer3] = await createCarManufacturer(carManufacturersData.carManufacturer3);

        // if this `until` resolves successfully, we know the deleted carManufacturer was deleted from elasticsearch
        await until(
            () =>
                invoke({
                    body: {
                        query: LIST_CAR_MANUFACTURERS
                    }
                }).then(([data]) => data),
            ({ data }) => data.carManufacturers.listCarManufacturers.data.length === 3,
            { name: "list carManufacturers" }
        );

        const [carManufacturersListResponse] = await invoke({
            body: {
                query: LIST_CAR_MANUFACTURERS,
                variables: {
                    sort: ["title_DESC"]
                }
            }
        });

        expect(carManufacturersListResponse).toEqual({
            data: {
                carManufacturers: {
                    listCarManufacturers: {
                        data: [
                            {
                                id: carManufacturer3.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer3,
                                description: null
                            },
                            {
                                id: carManufacturer2.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer2,
                                isNice: false
                            },
                            {
                                id: carManufacturer1.data.carManufacturers.createCarManufacturer.data.id,
                                ...carManufacturersData.carManufacturer1
                            }
                        ],
                        error: null
                    }
                }
            }
        });
    });
});

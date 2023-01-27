import React, { useEffect, useState } from "react";
import { request } from "graphql-request";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";

const GQL_API_URL = "https://spacex-production.up.railway.app/";

interface SpaceXItem {
    id: string;
    name: string;
    description: string;
    wikipedia: string;
}

const QUERIES = {
    rockets: /* GraphQL */ `
        query listRockets($limit: Int, $offset: Int) {
            data: rockets(limit: $limit, offset: $offset) {
                id
                name
                description
                wikipedia
            }
        }
    `,
    dragons: /* GraphQL */ `
        query listDragons($limit: Int, $offset: Int) {
            data: dragons(limit: $limit, offset: $offset) {
                id
                name
                description
                wikipedia
            }
        }
    `
};

export interface SpaceXElementData {
    variables: {
        limit: string;
        offset: string;
        type: "rockets" | "dragons";
    };
}

export const SpaceX = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement<SpaceXElementData>();
    const { limit, offset, type = "rockets" } = element.data.variables;

    const [data, setData] = useState<SpaceXItem[]>([]);

    useEffect(() => {
        request(GQL_API_URL, QUERIES[type], {
            limit: parseInt(limit),
            offset: parseInt(offset)
        }).then(({ data }) => setData(data));
    }, [limit, offset, type]);

    if (!data.length) {
        return <>Nothing to show.</>;
    }

    return (
        <ul>
            {data.map(item => (
                <li key={item.id}>
                    <h1>{item.name}</h1>
                    <div>{item.description}</div>
                    <br />
                    <div>
                        More info at&nbsp;
                        <a href={item.wikipedia} target={"_blank"} rel={"noreferrer"}>
                            {item.wikipedia}
                        </a>
                    </div>
                </li>
            ))}
        </ul>
    );
});

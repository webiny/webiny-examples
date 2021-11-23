import React from "react";
import { RoutePlugin } from "@webiny/app/plugins/RoutePlugin";
import { Link, Route, RouteChildrenProps } from "@webiny/react-router";
import { Empty, Image, Row, Col, Divider } from "antd";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "~/components/Layout";
import blankImage from "~/images/blankImage.png";

// Retrieves a previously created pin by given ID.
const GET_PIN = gql`
    query GetPin($id: ID!) {
        pins {
            getPin(id: $id) {
                id
                title
                description
                coverImage
                createdBy {
                    displayName
                }
            }
        }
    }
`;

// Only a single `id` parameter is present in the route.
type Props = RouteChildrenProps<{ id: string }>;

// The Pin Details page.
const PinDetails: React.FC<Props> = props => {
    const getPinQuery = useQuery(GET_PIN, { variables: { id: props.match.params.id } });
    const data = getPinQuery?.data?.pins?.getPin;

    return (
        <Layout className={"pin-details"}>
            {data ? (
                <Row gutter={24}>
                    <Col span={12} className={"centered"}>
                        {/* If we have an image, let's use the `Image` component
                        so that users have the option to show it full screen. */}
                        {data.coverImage ? (
                            <Image src={data.coverImage} />
                        ) : (
                            <img title={data.title} alt={data.title} src={blankImage} />
                        )}
                    </Col>
                    <Col span={12}>
                        <h1>{data.title}</h1>
                        <p>{data.description}</p>
                        <Divider />
                        <p>
                            Created by: <b>{data.createdBy?.displayName || "Unknown"}</b>
                        </p>
                    </Col>
                </Row>
            ) : (
                /* Data not loaded? Let's show a friendly `Nothing to show.` message */
                <Empty description={"Nothing to show."} />
            )}

            <Divider />
            <Link to={"/"}> &larr; Back</Link>
        </Layout>
    );
};

// We register routes via the `RoutePlugin` plugin.
export default new RoutePlugin({
    route: <Route path="/pins/:id" exact component={PinDetails} />
});

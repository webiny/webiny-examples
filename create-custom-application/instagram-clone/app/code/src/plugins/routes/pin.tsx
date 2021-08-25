import React from "react";
import { RoutePlugin } from "@webiny/app/plugins/RoutePlugin";
import { Link, Route, RouteChildrenProps } from "@webiny/react-router";
import {Avatar, Empty, Image, Row, Col, Divider} from "antd";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../../components/Layout";

const GET_PIN = gql`
    query GetPin($id: ID!) {
        pins {
            getPin(id: $id) {
                id
                title
                description
                coverImage
                createdBy {
                    id
                    type
                    displayName
                }
            }
        }
    }
`;

// The home page.
const Home: React.FC<RouteChildrenProps<{ id: string }>> = props => {
    const getPinQuery = useQuery(GET_PIN, { variables: { id: props.match.params.id } });
    const data = getPinQuery?.data?.pins?.getPin || {};

    return (
        <Layout className={"pin"}>
            {data ? (
                <>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Image src={data.coverImage} />
                        </Col>
                        <Col span={12}>
                            <h1>{data.title}</h1>
                            <p>{data.description}</p>

                            <Divider/>
                            {data.createdBy && (
                                <div className={"user"}>
                                    <div>
                                        <Avatar size={"large"}>
                                            {data.createdBy.displayName.charAt(0)}
                                        </Avatar>
                                    </div>
                                    <div>{data.createdBy.displayName}</div>
                                </div>
                            )}
                        </Col>
                    </Row>
                </>
            ) : (
                <Empty description={"Nothing to show."} />
            )}

            <div className="back-link">
                <Link to={"/"}> &larr; Back</Link>
            </div>
        </Layout>
    );
};

// We register routes via the `RoutePlugin` plugin.
export default new RoutePlugin({
    route: <Route path="/pins/:id" exact component={Home} />
});

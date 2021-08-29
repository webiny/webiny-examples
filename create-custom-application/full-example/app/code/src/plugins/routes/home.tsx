import React from "react";
import { RoutePlugin } from "@webiny/app/plugins/RoutePlugin";
import { Link, Route } from "@webiny/react-router";
import Columned from "react-columned";
import { Empty } from "antd";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../../components/Layout";
import blankImage from "../../images/blankImage.png";

const LIST_PINS = gql`
    query ListPins($sort: PinsListSort, $limit: Int, $after: String, $before: String) {
        pins {
            listPins(sort: $sort, limit: $limit, after: $after, before: $before) {
                data {
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
                meta {
                    before
                    after
                    limit
                }
            }
        }
    }
`;

// The home page.
const Home: React.FC = () => {
    const listPinsQuery = useQuery(LIST_PINS, { variables: { limit: 100 } });
    const { data = [] } = listPinsQuery?.data?.pins?.listPins || {};

    return (
        <Layout className={'home'}>
            {data.length > 0 ? (
                <Columned>
                    {data.map(item => (
                        <Link key={item.id} to={"/pins/" + item.id}>
                            <img alt={item.title} src={item.coverImage || blankImage} />
                        </Link>
                    ))}
                </Columned>
            ) : (
                <Empty description={"Nothing to show."} />
            )}
        </Layout>
    );
};

// We register routes via the `RoutePlugin` plugin.
export default new RoutePlugin({
    route: <Route path="/" exact component={Home} />
});

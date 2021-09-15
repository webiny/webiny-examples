import React from "react";
import { RoutePlugin } from "@webiny/app/plugins/RoutePlugin";
import { Link, Route } from "@webiny/react-router";
import { Empty } from "antd";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Columned from "react-columned";
import Layout from "~/components/Layout";
import blankImage from "~/images/blankImage.png";

const LIST_PINS = gql`
    query ListPins($sort: PinsListSort, $limit: Int, $after: String, $before: String) {
        pins {
            listPins(sort: $sort, limit: $limit, after: $after, before: $before) {
                data {
                    id
                    title
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
        <Layout className={"home"}>
            {data.length > 0 ? (
                /* If we have pins to show, use the `Columned` component to render them in a mosaic layout. */
                <Columned>
                    {data.map(item => (
                        /* Every pin should link to its details page. */
                        <Link key={item.id} to={"/pins/" + item.id}>
                            {/* If the pin contains an image, we show it. Otherwise, we show a placeholder image. */}
                            <img
                                title={item.title}
                                alt={item.title}
                                src={item.coverImage || blankImage}
                            />
                        </Link>
                    ))}
                </Columned>
            ) : (
                /* If there are no pins to show, render "Nothing to show." message. */
                <Empty description={"Nothing to show."} />
            )}
        </Layout>
    );
};

// We register routes via the `RoutePlugin` plugin.
export default new RoutePlugin({
    route: <Route path="/" exact component={Home} />
});

// Apollo
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

// Ant design
import { Row, Col } from 'antd'

// Components
import ProductCard from '../ProductCard'

export const QUERY = gql`
    query listProducts {
        listProducts {
            data {
                id
                title
                description
                price
                image
                category {
                    title
                    products {
                        title
                    }
                }
            }
        }
        listCategories {
            data {
                title
            }
        }
    }
`

export default function ProductList(props) {
    const { loading, error, data } = useQuery(QUERY)
    // if products are returned from the GraphQL query, run the filter query
    // and set equal to variable searchQuery
    if (loading) return <h1>Fetching</h1>

    if (error) return 'Error loading products: ' + error.message

    let ProductData = data.listProducts.data

    if (ProductData && ProductData.length) {
        const searchQuery = ProductData.filter((query) =>
            query.title.toLowerCase().includes(props.search)
        )
        if (searchQuery.length != 0) {
            return (
                <Row>
                    {searchQuery.map((res) => (
                        <Col xs="6" sm="6" key={res.id}>
                            <ProductCard {...res} />
                        </Col>
                    ))}
                </Row>
            )
        } else {
            return <h1>No Products Found</h1>
        }
    }
    return <h5>Visit your Webiny Headless CMS to add your Products</h5>
}

// Ant design
import { Col, Row } from 'antd';

// Components
import ProductCard from './Product';

export default function ProductList(props) {
    let ProductData = [
        {
            title: 'Webiny',
            description: 'Webiny Swag Pack for our belowed community!',
            image: '/webiny.png',
        },
        {
            title: 'Gatsby',
            description: 'Gatsby Swag Pack for our belowed community!',
            image: '/gatsby.png',
        },
        {
            title: 'React.js',
            description: 'React.js Swag Pack for our belowed community!',
            image: '/react.png',
        },
    ];

    if (ProductData && ProductData.length) {
        const searchQuery = ProductData.filter((query) =>
            query.title.toLowerCase().includes(props.search),
        );
        if (searchQuery.length != 0) {
            return (
                <Row>
                    {searchQuery.map((res) => (
                        <Col xs={24} md={12} lg={8} key={('card: ', res.title)}>
                            <ProductCard {...res} />
                        </Col>
                    ))}
                </Row>
            );
        } else {
            return <h1>No Products Found</h1>;
        }
    }
    return <h5>Visit your Webiny Headless CMS to add your Products</h5>;
}

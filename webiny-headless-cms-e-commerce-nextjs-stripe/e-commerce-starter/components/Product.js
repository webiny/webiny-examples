// Ant design
import { Avatar, Button, Card } from 'antd';
// React context
import { CartContext, FavoriteContext, TotalContext } from '../context/Context';
import {
    HeartOutlined,
    MinusCircleOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import React, { useContext } from 'react';

import { createFromIconfontCN } from '@ant-design/icons';

const { Meta } = Card;

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

export default function ProductCard(props) {
    const [cart, setCart] = useContext(CartContext);
    const [totalPrice, settotalPrice] = useContext(TotalContext);

    const [favorites, setFavorite] = useContext(FavoriteContext);

    const addToCart = (product) => {
        setCart([...cart, product]);
        let TP = cart.reduce((acc, curr) => acc + curr.price, 0);
        settotalPrice(TP);
    };
    const removeFromCart = (prodId) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== prodId);
        setCart(hardCopy);
    };

    function addToFavorites(prod) {
        setFavorite([...favorites, prod]);
    }
    function goToProduct(id) {
        // TODO: Create a modal that shows the product details
    }
    return (
        <Card
            size="small"
            style={{
                margin: '20px 0.5rem',
                width: '300px',
            }}
            actions={[
                <Button
                    onClick={() => {
                        addToFavorites(props);
                    }}
                >
                    <HeartOutlined />
                </Button>,
                <Button
                    onClick={() => {
                        addToCart(props);
                    }}
                >
                    <ShoppingCartOutlined />
                </Button>,
                <Button
                    onClick={() => {
                        goToProduct();
                    }}
                >
                    <IconFont type="icon-tuichu" />
                </Button>,
                <Button
                    onClick={() => {
                        removeFromCart(props.id);
                    }}
                >
                    <MinusCircleOutlined />
                </Button>,
            ]}
        >
            <Meta
                avatar={<Avatar src={props.image} />}
                title={props.title}
                description={props.description}
            />
        </Card>
    );
}

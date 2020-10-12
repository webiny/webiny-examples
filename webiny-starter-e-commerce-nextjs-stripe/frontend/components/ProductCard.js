import React, { useState, useEffect, useContext } from 'react'

// Ant design
import { Card, Avatar, Button, Modal } from 'antd'
import {
    HeartOutlined,
    ShoppingCartOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons'

const { Meta } = Card
import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

// React context
import { CartContext, FavoriteContext, TotalContext } from '../context/Context'

export default function ProductCard(props) {
    const [cart, setCart] = useContext(CartContext)
    const [totalPrice, settotalPrice] = useContext(TotalContext)

    const [favorites, setFavorite] = useContext(FavoriteContext)

    const addToCart = (product) => {
        setCart([...cart, product])
        let TP = cart.reduce((acc, curr) => acc + curr.price, 0)
        settotalPrice(TP)
    }
    const removeFromCart = (prodId) => {
        let hardCopy = [...cart]
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== prodId)
        setCart(hardCopy)
    }

    function addToFavorites(prod) {
        setFavorite([...favorites, prod])
    }
    function goToProduct(id) {
        // TODO: Create a modal that shows the product details
    }
    return (
        <Card
            size="small"
            style={{ margin: '0 0.5rem 20px 0.5rem', width: '250px' }}
            actions={[
                <Button
                    onClick={() => {
                        addToFavorites(props)
                    }}
                >
                    <HeartOutlined />
                </Button>,
                <Button
                    onClick={() => {
                        addToCart(props)
                    }}
                >
                    <ShoppingCartOutlined />
                </Button>,
                <Button
                    onClick={() => {
                        goToProduct()
                    }}
                >
                    <IconFont type="icon-tuichu" />
                </Button>,
                <Button
                    onClick={() => {
                        removeFromCart(props.id)
                    }}
                >
                    <MinusCircleOutlined />
                </Button>,
            ]}
        >
            <Meta
                avatar={
                    <Avatar
                        src={props.title}
                    />
                }
                title={props.title}
                description={props.description}
            />
        </Card>
    )
}

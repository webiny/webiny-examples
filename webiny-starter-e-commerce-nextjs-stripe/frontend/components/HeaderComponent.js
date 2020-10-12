import React, { useContext, useState } from 'react'

// Next.js
import Head from 'next/head'
import Link from 'next/link'

// Ant Design
import { Layout, Menu, Avatar, Button, Modal, List, Popover } from 'antd'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
const { Header } = Layout
import {
    CartContext,
    FavoriteContext,
    ModalContext,
    // TotalContext,
} from '../context/Context'

// Components
import { Cart } from './Cart'

export default function HeaderComponent(props) {
    const [cart] = useContext(CartContext)
    const [favorites] = useContext(FavoriteContext)
    const [visible, setVisible] = useContext(ModalContext)

    // TODO: Use total price in the header
    // const [totalPrice, settotalPrice] = useContext(TotalContext)

    const toggleVisibility = React.useCallback(() => setVisible(!visible), [
        setVisible,
    ])

    return (
        <div>
            <Head>
                <title>{props.title}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />

                <link rel="webiny icon" href="/webiny.png" />
            </Head>
            <Layout>
                <Header
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        width: '100%',
                        background: '#fff',
                    }}
                >
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['']}
                        style={{ background: '#fff' }}
                    >
                        <Menu.Item
                            key="9"
                            style={{ background: 'transparent' }}
                        >
                            <Link href="/" className="nav-text">
                                <Avatar src="/webiny.png" />
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="20">
                            <Button onClick={() => console.log('asda')}>
                                <HeartOutlined />
                                {favorites.length}
                            </Button>
                        </Menu.Item>
                        <Menu.Item key="21">
                            <Button
                                onClick={() => {
                                    toggleVisibility(true)
                                }}
                            >
                                <ShoppingCartOutlined />
                                {cart.length}
                            </Button>
                            <Cart />
                        </Menu.Item>
                        <Menu.Item key="22">
                            <a href="http://webiny.com?utm_source=Webiny-blog&utm_medium=webiny-website&utm_campaign=webiny-blog-e-commerce-oct-12&utm_content=webiny-blog-e-commerce-nextjs&utm_term=W00176" target="_blank" rel="noopener noreferrer">
                                WEBINY - THE EASIEST WAY TO ADOPT SERVERLESS
                            </a>
                        </Menu.Item>
                    </Menu>
                </Header>
            
            </Layout>
        </div>
    )
}

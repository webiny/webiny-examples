import React, { useContext } from 'react'
import Router from 'next/router'

// Context
import { CartContext, TotalContext } from '../context/Context'
import { ModalContext } from '../context/Context'

// Ant design
import { Avatar, Button, Modal, List } from 'antd'

export const Cart = () => {
    const [cart] = useContext(CartContext)
    const [visible, setVisible] = useContext(ModalContext)
    const [totalPrice, settotalPrice] = useContext(TotalContext)

    const checkout = () => {
        setVisible(false)
        Router.push('/checkout')
    }

    return cart.length != 0 ? (
        <Modal
            title="Products Cart"
            centered
            visible={visible}
            onSubmit={() => {
                setVisible(false)
            }}
            onCancel={() => setVisible(false)}
            width={1000}
            footer={[
                <h3>Total Price: ${totalPrice}</h3>,
                <Button key="submit" type="primary" onClick={checkout}>
                    Checkout
                </Button>,
            ]}
        >
            <List
                itemLayout="horizontal"
                dataSource={cart}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            key={item.id}
                            avatar={
                                <Avatar
                                    src={
                                        item.title === 'Next.Js'
                                            ? '/nextjs.png'
                                            : '/gatsby.png' &&
                                              item.title === 'Vue Js'
                                            ? '/vue.png'
                                            : 'gatsby.png'
                                    }
                                />
                            }
                            title={<a href={item.permalink}>{item.title}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    ) : (
        ''
    )
}

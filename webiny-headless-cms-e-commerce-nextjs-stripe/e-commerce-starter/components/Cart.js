// Ant design
import { Avatar, Button, List, Modal } from 'antd';
// Context
import { CartContext, TotalContext } from '../context/Context';
// React
import React, { useContext } from 'react';

import { ModalContext } from '../context/Context';
import Router from 'next/router';

export const Cart = () => {
    const [cart] = useContext(CartContext);
    const [visible, setVisible] = useContext(ModalContext);
    const [totalPrice, settotalPrice] = useContext(TotalContext);

    const checkout = () => {
        setVisible(false);
        Router.push('/checkout');
    };

    return cart.length != 0 ? (
        <Modal
            title="Products Cart"
            centered
            visible={visible}
            onSubmit={() => {
                setVisible(false);
            }}
            onCancel={() => setVisible(false)}
            width={1000}
            footer={[
                <h3>
                    Total Price:
                    {/* ${totalPrice} */}
                </h3>,
                <Button type="primary" onClick={checkout}>
                    Checkout
                </Button>,
            ]}
        >
            <List
                itemLayout="horizontal"
                dataSource={cart}
                renderItem={(item) => (
                    <List.Item key={('item: ', item.title)}>
                        <List.Item.Meta
                            avatar={<Avatar src="/webiny.png" />}
                            title={<a href={item.title}>{item.title}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    ) : (
        ''
    );
};

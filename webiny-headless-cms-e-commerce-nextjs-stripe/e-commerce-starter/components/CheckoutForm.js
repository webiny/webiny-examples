// Ant design
import { Button, Form } from 'antd';
// React context
import { CartContext, TotalContext } from '../context/Context';
import React, { useContext, useState } from 'react';

// Components
import { BillingDetailsFields } from './BillingDetailsField';
// styled components
import styled from 'styled-components';

const iframeStyles = {
    base: {
        color: '#ff748c',
        fontSize: '16px',
        iconColor: '#ff748c',
        '::placeholder': {
            color: '#87bbfd',
        },
        border: '1px solid gray',
    },
    invalid: {
        iconColor: '#ff748c',
        color: '#ff748c',
    },
    complete: {
        iconColor: '#ff748c',
    },
};

const cardElementOpts = {
    iconStyle: 'solid',
    style: iframeStyles,
    hidePostalCode: true,
};

const CardElementContainer = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    & .StripeElement {
        width: 100%;
        padding: 15px;
    }
`;

const CheckoutForm = () => {
    const [form] = Form.useForm();
    const [cart, setCart] = useContext(CartContext);
    const [totalPrice, settotalPrice] = useContext(TotalContext);
    const [isProcessing, setProcessingTo] = useState(false);

    const [checkoutError, setCheckoutError] = useState();
    const handleCardDetailsChange = (ev) => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();

        const billingDetails = {
            name: e.name.value,
            email: e.email.value,
            address: {
                city: e.city.value,
                state: e.state.value,
                postal_code: e.zip.value,
            },
        };
    };

    return (
        <Form
            form={form}
            name="checkout"
            onFinish={handleSubmit}
            scrollToFirstError
        >
            <BillingDetailsFields />
            <CardElementContainer></CardElementContainer>{' '}
            {checkoutError && (
                <span style={{ color: 'red' }}>{checkoutError}</span>
            )}
            <br />
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Processing...' : `Pay ${totalPrice}`}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CheckoutForm;

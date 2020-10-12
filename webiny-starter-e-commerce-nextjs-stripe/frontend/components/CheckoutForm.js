import React, { useState, useContext } from 'react'

// Stripe
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { destroyCookie } from 'nookies'

// React context
import { CartContext, TotalContext } from '../context/Context'

// Components
import { BillingDetailsFields } from './BillingDetailsFields'

// styled components
import styled from 'styled-components'

// Ant design
import { Form, Button } from 'antd'

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
}

const cardElementOpts = {
    iconStyle: 'solid',
    style: iframeStyles,
    hidePostalCode: true,
}

const CardElementContainer = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    & .StripeElement {
        width: 100%;
        padding: 15px;
    }
`

const CheckoutForm = ({ paymentIntent }) => {
    const [form] = Form.useForm()
    const [cart, setCart] = useContext(CartContext)
    const [totalPrice, settotalPrice] = useContext(TotalContext)

    const stripe = useStripe()
    const elements = useElements()

    const [checkoutError, setCheckoutError] = useState()
    const [checkoutSuccess, setCheckoutSuccess] = useState()
    const handleCardDetailsChange = (ev) => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError()
    }

    const handleSubmit = async (e) => {
        // e.preventDefault()

        const billingDetails = {
            name: e.name.value,
            email: e.email.value,
            address: {
                city: e.city.value,
                state: e.state.value,
                postal_code: e.zip.value,
            },
        }

        try {
            const response = await fetch('/api/payment_intents', {
                method: 'POST',
                body: JSON.stringify({
                    amount: totalPrice,
                    paymentIntentId: paymentIntent.id,
                }),
            })
            const responseJSON = await response.json()

            const {
                error,
                paymentIntent: { status },
            } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: billingDetails,
                },
            })

            if (error) throw new Error(error.message)

            if (status === 'succeeded') {
                destroyCookie(null, 'paymentIntentId')
                setCheckoutSuccess(true)
                setCart([])
                settotalPrice(0)
            }
        } catch (err) {
            setCheckoutError(err.message)
        }
    }

    if (checkoutSuccess) return <p style={{color: "black"}}>Payment successfull!</p>

    return (
        <Form
            form={form}
            name="checkout"
            onFinish={handleSubmit}
            scrollToFirstError
        >
            <BillingDetailsFields />
            <CardElementContainer>
                <CardElement
                    options={cardElementOpts}
                    onChange={handleCardDetailsChange}
                />
            </CardElementContainer>{' '}
            {checkoutError && (
                <span style={{ color: 'red' }}>{checkoutError}</span>
            )}
            <br />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Buy
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CheckoutForm

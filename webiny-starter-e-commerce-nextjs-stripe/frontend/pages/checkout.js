import React from 'react'
import Stripe from 'stripe'
import { parseCookies, setCookie } from 'nookies'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = new loadStripe(
    'STRIPE_PUBLISHABLE_KEY_HERE'
)

import CheckoutForm from '../components/CheckoutForm'

// initialize the stripe library and create a payment intent
export const getServerSideProps = async ({ ctx }) => {
    const stripe = new Stripe(
        'STRIPE_SECRET_KEY_HERE'
    )

    let paymentIntent

    const { paymentIntentId } = await parseCookies(ctx)

    if (paymentIntentId) {
        paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

        return {
            props: {
                paymentIntent,
            },
        }
    }

    // create a payment intent
    paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
    })

    // pass the context which is giving to us be serversideprops.
    setCookie(ctx, 'paymentIntentId', paymentIntent.id)

    return {
        props: {
            paymentIntent,
        },
    }
}

const CheckoutPage = ({ paymentIntent }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm paymentIntent={paymentIntent} />
        </Elements>
    )
}

export default CheckoutPage

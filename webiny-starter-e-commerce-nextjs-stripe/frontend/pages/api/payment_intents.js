import Stripe from 'stripe'

const stripe = new Stripe(
    'STRIPE_SECRET_KEY_HERE'
)

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { amount, paymentIntentId } = JSON.parse(req.body)
            const updatedPaymentIntent = await stripe.paymentIntents.update(
                paymentIntentId,
                { amount }
            )

            res.status(200).json({ updatedPaymentIntent })
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message })
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}

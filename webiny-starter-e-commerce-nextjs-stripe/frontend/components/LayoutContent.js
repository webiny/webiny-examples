import React from 'react'
// Ant Design
import { Layout } from 'antd'
const { Content, Footer } = Layout

// Components
import CategoriesMenu from './CategoriesMenu'

// Stripe
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

// Components 
import HeaderComponent from './HeaderComponent'

const stripePromise = loadStripe(
    'STRIPE_PUBLISHABLE_KEY_HERE'
)

// TIP: Don't call loadStripe within the render method of component
// the idea - you don't want to load more than you have to - you only have to load it once per page

function LayoutContent(props) {
    const title = 'Webiny'
    return (
        <div>
            <HeaderComponent title={title} />
            <Content
                style={{
                    padding: '50px 50px',
                    minHeight: '800px',
                    background: '#fff',
                }}
            >
                <Layout
                    className="site-layout-background"
                    style={{ padding: '24px 0', background: '#fff' }}
                >
                    <CategoriesMenu />
                    <Elements stripe={stripePromise}>
                        <Content
                            style={{
                                padding: '0 24px',
                            }}
                        >
                            {props.children}
                        </Content>
                    </Elements>
                </Layout>
                <Footer style={{ textAlign: 'center', background: '#fff' }}>
                    E-Commerce Website with Webiny and Next.js @ 2020
                </Footer>
            </Content>
        </div>
    )
}

export default LayoutContent

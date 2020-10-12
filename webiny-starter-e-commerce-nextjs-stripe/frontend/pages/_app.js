// import '../assets/antd-custom.less'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'

// Layout Component
import LayoutContent from '../components/LayoutContent'

// React Context
import { CartProvider } from '../context/Context'

export default function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState)

    return (
        <ApolloProvider client={apolloClient}>
            <ApolloHooksProvider client={apolloClient}>
                <CartProvider>
                    <LayoutContent>
                        <Component {...pageProps} />
                    </LayoutContent>
                </CartProvider>
            </ApolloHooksProvider>
        </ApolloProvider>
    )
}

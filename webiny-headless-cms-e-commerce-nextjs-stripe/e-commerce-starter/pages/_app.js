import '../assets/antd-custom.less';

import { CartProvider } from '../context/Context';
// Layout Component
import LayoutComponent from '../components/Layout';

// React Context

export default function App({ Component, pageProps }) {
    return (
        <CartProvider>
            <LayoutComponent>
                <Component {...pageProps} />
            </LayoutComponent>
        </CartProvider>
    );
}

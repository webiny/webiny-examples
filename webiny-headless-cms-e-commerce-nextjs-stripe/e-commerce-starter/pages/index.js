import React, { useState } from 'react';

// Ant design
import { Input } from 'antd';
// Products
import ProductList from '../components/ProductList';

const { Search } = Input;

export default function Home() {
    const [query, updateQuery] = useState('');
    return (
        <>
            <h2 style={{ color: '#fa5723' }}>
                E-commerce website build with Webiny Headless CMS, Next.js, and
                Stripe!
            </h2>

            <Search
                placeholder="Search for products"
                onSearch={(value) => console.log(value)}
                style={{ width: 400, margin: 20 }}
                onChange={(e) =>
                    updateQuery(e.target.value.toLocaleLowerCase())
                }
                value={query}
            />
            <ProductList search={query} />
        </>
    );
}

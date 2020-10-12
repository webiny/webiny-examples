import React, { useState } from 'react'

// Ant design
import { Input } from 'antd'

const { Search } = Input

import ProductList, { QUERY } from '../components/ProductList'

// Apollo
import { initializeApollo } from '../lib/apolloClient'

function Home() {
    const [query, updateQuery] = useState('')

    return (
        <div>
            <Input.Group>
                <Search
                    placeholder="Search for products"
                    onSearch={(value) => console.log(value)}
                    style={{ width: 200, margin: '20px 5px' }}
                    onChange={(e) =>
                        updateQuery(e.target.value.toLocaleLowerCase())
                    }
                    value={query}
                />
            </Input.Group>
            <ProductList search={query} />
        </div>
    )
}

export async function getStaticProps() {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: QUERY,
    })

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    }
}

export default Home

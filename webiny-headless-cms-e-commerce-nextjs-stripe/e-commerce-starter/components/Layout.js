import React, { useState } from 'react';

// Header
import HeaderComponent from './Header';
// Ant Design
import { Layout } from 'antd';

const { Content, Footer } = Layout;

function LayoutComponent(props) {
    const title = 'Webiny';
    return (
        <div>
            <HeaderComponent title={title} />
            <Content className="site-layout">
                <Layout
                    className="site-layout-background"
                    style={{
                        padding: '24px 0',
                        marginTop: 64,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '500px',
                        background: '#fff',
                    }}
                >
                    <Content
                        style={{
                            padding: '24px',
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center', background: '#fff' }}>
                    <a
                        href="http://webiny.com/serverless-app/headless-cms?utm_source=Webiny-blog&utm_medium=webiny-website&utm_campaign=webiny-blog-e-commerce-oct-12&utm_content=webiny-blog-e-commerce-nextjs&utm_term=W00176"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Webiny Serverless Headless CMS @ 2020
                    </a>
                </Footer>
            </Content>
        </div>
    );
}

export default LayoutComponent;

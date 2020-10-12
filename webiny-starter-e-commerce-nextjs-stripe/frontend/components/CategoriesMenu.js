// Apollo
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

// Ant design
import { Layout, Menu } from 'antd'
const { Sider } = Layout

export const QUERY_CATEGORIES = gql`
    query listCategories {
        listCategories {
            data {
                title
            }
        }
    }
`

function CategoriesMenu() {
    let {
        loading: categoriesLoading,
        error: categoriesError,
        data: catData,
    } = useQuery(QUERY_CATEGORIES)

    if (categoriesLoading) return <h1>Fetching</h1>

    if (categoriesError) return 'Error: ' + categoriesError.message

    const catDataa = catData.listCategories.data

    // TODO: Filter products based on category
    return (
        <Sider
            className="site-layout-background"
            width={200}
            style={{ background: 'transparent' }}
        >
            <h3>Categories</h3>
            <Menu
                mode="inline"
                defaultSelectedKeys={['']}
                defaultOpenKeys={['']}
                style={{ height: '100%' }}
            >
                {catDataa.map((category) => {
                    return <Menu.Item key="">{category.title}</Menu.Item>
                })}
            </Menu>
        </Sider>
    )
}

export default CategoriesMenu

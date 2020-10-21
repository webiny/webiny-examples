// Ant design
import { Layout, Menu } from 'antd';

function Categories() {
    // TODO: Query categories from the headless CMS
    const catDataa = [
        {
            title: 'Stickers',
        },
        {
            title: 'T-shirt',
        },
    ];

    // TODO: Filter products based on category
    return (
        <Menu>
            {catDataa.map((category) => {
                return (
                    <Menu.Item key={('category:', category.title)}>
                        {category.title}
                    </Menu.Item>
                );
            })}
        </Menu>
    );
}

export default Categories;

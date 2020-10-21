import { Form, Input } from 'antd';

export const BillingDetailsFields = () => {
    return (
        <div>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your full name!',
                    },
                ]}
            >
                <Input
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item
                name="address"
                label="Address"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Address!',
                    },
                ]}
            >
                <Input
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item
                name="city"
                label="City"
                rules={[
                    {
                        required: true,
                        message: 'Please input the city!',
                    },
                ]}
            >
                <Input
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item
                name="state"
                label="State"
                rules={[
                    {
                        required: true,
                        message: 'Please input your State!',
                    },
                ]}
            >
                <Input
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item
                name="zip"
                label="ZIP"
                rules={[
                    {
                        required: true,
                        message: 'Please input your ZIP!',
                    },
                ]}
            >
                <Input
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
        </div>
    );
};

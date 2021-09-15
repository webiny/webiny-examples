import React, { useCallback } from "react";
import { Modal } from "antd";
import { Form, Input } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { message } from "antd";
import gql from "graphql-tag";

// The mutation which we'll issue on form submissions.
const CREATE_PIN = gql`
    mutation CreatePin($data: PinCreateInput!) {
        pins {
            createPin(data: $data) {
                id
                title
                description
            }
        }
    }
`;

type Props = {
    visible: boolean;
    onClose: Function;
};

const NewPinModal: React.FC<Props> = props => {
    // A reference to the form rendered below.
    const [form] = Form.useForm();

    // A simple mutation for creating new pins.
    const [createPin] = useMutation(CREATE_PIN);

    // Once the form is submitted and all field validation is passing, this callback will get executed.
    const onFinish = useCallback(async ({ title, description }) => {
        await createPin({
            variables: {
                data: { title, description }
            },
            refetchQueries: ["ListPins"]
        });
        message.success(`New pin ${title} created successfully!`);
        form.resetFields();
        props.onClose();
    }, []);

    // Submits the form and only triggers the `onFinish` callback if all fields are valid.
    const onModalOk = useCallback(() => form.submit(), [])

    // Reset the form and close the modal dialog.
    const onModalCancel = useCallback(() => {
        form.resetFields();
        props.onClose()
    }, [])

    return (
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} onFinish={onFinish}>
            <Modal
                title="New Pin"
                width={700}
                visible={props.visible}
                onOk={onModalOk}
                onCancel={onModalCancel}
            >
                <Form.Item name={["title"]} label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={["description"]} label="Description">
                    <Input.TextArea />
                </Form.Item>
            </Modal>
        </Form>
    );
};

export default NewPinModal;

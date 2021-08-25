import React, { useState } from "react";
import { Modal } from "antd";
import { Form, Input } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import gql from "graphql-tag";

type Props = {
    visible: boolean;
    onClose: Function;
};

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}

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

const CREATE_PRE_SIGNED_POST_PAYLOAD = gql`
    mutation CreatePreSignedPostPayload($data: PreSignedPostPayloadInput!) {
        pins {
            createPreSignedPostPayload(data: $data) {
                file {
                    name
                    size
                    key
                    type
                }
                data
            }
        }
    }
`;

const NewPinModal: React.FC<Props> = props => {
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    };

    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not a valid email!",
            number: "${label} is not a valid number!"
        },
        number: {
            range: "${label} must be between ${min} and ${max}"
        }
    };

    const [form] = Form.useForm();

    const [createPresignedPostPayload] = useMutation(CREATE_PRE_SIGNED_POST_PAYLOAD);
    const [createPin] = useMutation(CREATE_PIN);


    // @ts-ignore
    window.form = form;

    return (
        <Form
            {...layout}
            form={form}
            validateMessages={validateMessages}
            onFinish={async ({ title, description, coverImage }) => {
                await createPin({
                    variables: {
                        data: { title, description, coverImage }
                    },
                    refetchQueries: ['ListPins']
                });
                message.success(`New pin ${title} created successfully!`);
                form.resetFields();
                setImageUrl(null);
                // props.onClose()
            }}
        >
            <Modal
                title="New Pin"
                width={700}
                visible={props.visible}
                onOk={() => form.submit()}
                onCancel={() => props.onClose()}
            >
                <Form.Item name={["title"]} label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={["description"]} label="Description">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item hidden name={["coverImage"]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name={["coverImageUploadField"]}
                    label="Cover Image"
                    rules={[{ required: true }]}
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => {
                        return e && e.fileList;
                    }}
                >
                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={async ({ file }) => {
                            if (file.status === "uploading") {
                                setLoading(true);
                                return;
                            }

                            setLoading(false);
                            if (file.status === "done") {
                                message.success(`${file.name} file uploaded successfully`);
                                const { url, fields } = file.response.presignedPostPayload.data;
                                const coverImage = url + "/" + fields.key;
                                form.setFieldsValue({ coverImage });
                                setImageUrl(coverImage);
                                return;
                            }

                            message.error(`${file.name} file upload failed.`);
                        }}
                        customRequest={async ({ file, onError, onSuccess }) => {
                            const { size, type, name } = file as File;

                            const presignedPostPayload = await createPresignedPostPayload({
                                variables: { data: { size, type, name } }
                            }).then(response => response.data.pins.createPreSignedPostPayload);

                            const { data } = presignedPostPayload;

                            const formData = new FormData();
                            Object.keys(data.fields).forEach(key => {
                                formData.append(key, data.fields[key]);
                            });
                            // Actual file has to be appended last.
                            formData.append("file", file);
                            const xhr = new XMLHttpRequest();
                            xhr.open("POST", data.url, true);
                            xhr.send(formData);
                            xhr.onload = function () {
                                if (this.status === 204) {
                                    onSuccess({ presignedPostPayload }, xhr);
                                } else {
                                    onError({
                                        status: this.status,
                                        method: "POST",
                                        message: "File upload failed.",
                                        name: name
                                    });
                                }
                            };
                        }}
                    >
                        {imageUrl ? (
                            <img src={imageUrl} alt={"Cover Image"} style={{ width: "100%" }} />
                        ) : (
                            <div>
                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </Modal>
        </Form>
    );
};

export default NewPinModal;

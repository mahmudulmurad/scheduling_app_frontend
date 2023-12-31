import React from "react";
import { Modal, Form, Input, Select } from "antd";

interface EditModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
  initialValues: any;
}

const { Option } = Select;

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Edit Employee"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} initialValues={initialValues}>
        <Form.Item
          label="Id"
          name="_id"
          rules={[{ required: true, message: "Id is required" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Gender is required" }]}
        >
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Unknown">Unknown</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="isActive"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select>
            <Option value={"Active"}>Active</Option>
            <Option value={"Inactive"}>Inactive</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;

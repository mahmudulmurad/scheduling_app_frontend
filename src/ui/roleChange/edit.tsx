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
          label="Role"
          name="role"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select>
            <Option value="EMPLOYEE">EMPLOYEE</Option>
            <Option value="SUPERVISOR">SUPERVISOR</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;

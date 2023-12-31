import { useState } from "react";
import { Descriptions, Button, Modal, Form, Input, Select } from "antd";
import { User, useAuth } from "context";
import { patchRequest } from "service";
import { profile_update } from "api";

const { Option } = Select;

const ProfileUI = () => {
  const { user, setUser } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    const response = await patchRequest<User>(profile_update(user._id), values);
    setUser(response.payload);
    setIsModalVisible(false);
  };

  return (
    <div>
      <Descriptions title="User Profile" bordered>
        <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
        <Descriptions.Item label="Phone">{user?.phone}</Descriptions.Item>
        <Descriptions.Item label="Gender">{user?.gender}</Descriptions.Item>
        <Descriptions.Item label="Role">{user?.role}</Descriptions.Item>
        <Descriptions.Item label="Status">{user?.isActive}</Descriptions.Item>
      </Descriptions>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="editProfileForm"
          onFinish={onFinish}
          initialValues={user!}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Unknown">Unknown</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileUI;

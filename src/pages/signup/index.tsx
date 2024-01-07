import React from "react";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { signup_url } from "api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const { Option } = Select;

type FieldType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: unknown) => {
    try {
      const typedValues = values as FieldType;

      const response = await axios.post(signup_url, typedValues);

      if (response.status === 201) {
        toast.success(response.data.msg);
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error("Signup unsuccessful");
    }
  };

  return (
    <SignupContainer>
      <SignupForm
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title>Sign Up</Title>
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email address!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Unknown">Unknown</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
        <LoginLink>
          Already have an account? <Link to="/auth/login">Login</Link>
        </LoginLink>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #001529;
`;

const SignupForm = styled(Form)`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  color: #1890ff;
`;

const LoginLink = styled.p`
  margin-top: 16px;
  text-align: center;
`;

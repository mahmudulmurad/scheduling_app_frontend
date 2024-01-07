import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { login_url } from "api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(login_url, values);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.payload));
        navigate("/");
        toast.success(response.data.msg);
        console.log("murad");
      }
    } catch (error) {
      toast.error("Login unsuccessful");
    }
  };

  return (
    <LoginContainer>
      <LoginForm
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title>Login</Title>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email address!" },
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
        <SignupLink>
          Don't have an account? <Link to="/auth/signup">Signup</Link>
        </SignupLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #001529;
`;

const LoginForm = styled(Form)`
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

const SignupLink = styled.p`
  margin-top: 16px;
  text-align: center;
`;

import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ logIn }) {
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log("Lỗi submit")
  };
  const onFinish = async (values) => {
    try {
    await axios.post(
        "https://backoffice.nodemy.vn/api/auth/local/register/",
        {
          username: values.username,
          email: values.email,
          password: values.password,
        }
      );
    } catch (error) {
      console.log("Đăng kí thất bại");
    }
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={logIn}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

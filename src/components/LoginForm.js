import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './LoginForm.css'
export default function LoginForm({ logIn }) {
  const navigate = useNavigate();
  const Swal = require('sweetalert2')
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        "https://backoffice.nodemy.vn/api/auth/local",
        { identifier: values.email, password: values.password }
      );
      console.log(res);
      const { jwt } = res.data;
      Cookies.set("jwt", jwt);
      Cookies.set("login", "true");
      navigate("todoapp");
      //   navigate("/")
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Tài khoản và mật khẩu không chính xác',
        text: 'Vui lòng đăng nhập lại',
      })
    }
  };
  return (
    <div className="form-login">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 900,
        }}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        //   autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email",
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

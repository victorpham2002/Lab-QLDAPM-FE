/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button, Checkbox, Form, type FormProps, Input } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
  errorInfo: any,
) => {
  console.log("Failed:", errorInfo);
};

const App: React.FC = () => (
  <Form
    name="basic"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    style={{ minWidth: 400 }}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
  >
    <Form.Item<FieldType>
      label="Tên đăng nhập"
      name="username"
      rules={[{ required: true, message: "Yêu cầu thông tin" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Mật khẩu"
      name="password"
      rules={[{ required: true, message: "Yêu cầu thông tin" }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Ghi nhớ đăng nhập</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Đăng nhập
      </Button>
    </Form.Item>
  </Form>
);

export default App;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button, Checkbox, Form, type FormProps, Input } from "antd";
import { useRouter } from "next/navigation";
interface SignInBody {
  username: string;
  password: string;
}
const App: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: SignInBody) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.data.access_token}`;
        if (data.data.role === 1) {
          router.push("/event/admin");
        } else if (data.data.role === 2) {
          router.push("/event/organizer");
        } else {
          router.push("/event/student");
        }
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFinishFailed: FormProps<SignInBody>["onFinishFailed"] = (
    errorInfo: any,
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
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
      <Form.Item<SignInBody>
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: "Yêu cầu thông tin" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignInBody>
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Yêu cầu thông tin" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<SignInBody>
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
};
export default App;

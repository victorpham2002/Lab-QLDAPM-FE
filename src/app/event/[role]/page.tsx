/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  Table,
} from "antd";
import type { TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import dayjs from "dayjs";
interface DataType {
  key: string;
  name: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  status: string;
  description?: string;
}
const App: React.FC<{ params: { role: string } }> = ({ params }) => {
  const role = params.role.toLowerCase() as "admin" | "organizer" | "student";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"new" | "detail" | "none">("none");
  const [eventData, setEventData] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = document.cookie
          ? document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]
          : "none";
        const response = await fetch("/api/event", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          setEventData(data.data);
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error while fetching user information:", error);
      }
    };
    fetchUserInfo();
  }, []);
  const showModal = (event: string, record: DataType) => {
    if (event === "detail") {
      form.setFieldsValue({
        name: record.name,
        startDate: dayjs(record.startDate),
        endDate: dayjs(record.endDate),
        description: record.description,
      });
    }

    setIsModalOpen(true);
    setModalType(event as "new" | "detail");
  };

  const handleOk = async () => {
    setIsModalOpen(false);

    if (modalType === "new") {
      // todo: create event
      const res = form.getFieldsValue(true);
      try {
        const token = document.cookie
          ? document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]
          : "none";
        const response = await fetch("/api/event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(res),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Failed to create event");
        }
      } catch (error) {
        console.error("Error while creating event:", error);
      }
    }
    if (modalType === "detail") {
      // todo: join event
    }

    setModalType("none");
  };

  const handleCancel = () => {
    setModalType("none");
    setIsModalOpen(false);
  };

  const getTitle = () => {
    if (role === "admin") return "Quản lý sự kiện";
    return "Danh sách sự kiện";
  };

  const getModalTitle = () => {
    if (modalType === "new") return "Tạo sự kiện";
    if (modalType === "detail") return "Chi tiết sự kiện";
    return "Loading...";
  };

  let columns: TableProps<DataType>["columns"];

  if (role === "admin") {
    columns = [
      {
        title: "Tên sự kiện",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date: Date) => (date ? new Date(date).toLocaleString() : ""),
      },
      {
        title: "Thời gian bắt đầu",
        dataIndex: "startDate",
        key: "startDate",
        render: (date: Date) => (date ? new Date(date).toLocaleString() : ""),
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "endDate",
        key: "endDate",
        render: (date: Date) => (date ? new Date(date).toLocaleString() : ""),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => showModal("detail", record)}>
              Chi tiết
            </Button>
            <Button type="primary" ghost>
              Đồng ý
            </Button>
            <Button danger>Từ Chối</Button>
          </Space>
        ),
      },
    ];
  }

  if (role === "organizer") {
    columns = [
      {
        title: "Tên sự kiện",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date: Date) => date.toLocaleString(),
      },
      {
        title: "Thời gian bắt đầu",
        dataIndex: "startDate",
        key: "startDate",
        render: (date: Date) => date.toLocaleString(),
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "endDate",
        key: "endDate",
        render: (date: Date) => date.toLocaleString(),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => showModal("detail", record)}>
              Chi tiết
            </Button>
          </Space>
        ),
      },
    ];
  }

  if (role === "student") {
    columns = [
      {
        title: "Tên sự kiện",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Thời gian bắt đầu",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "endDate",
        key: "endDate",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => showModal("detail", record)}>
              Chi tiết
            </Button>
            <Button type="primary" ghost>
              Tham gia
            </Button>
          </Space>
        ),
      },
    ];
  }

  return (
    <>
      <Col span={16} offset={4}>
        <Card>
          <Row justify="space-between">
            <Col>
              <Title level={3}>{getTitle()}</Title>
            </Col>

            {role === "organizer" && (
              <Button
                type="primary"
                onClick={() => showModal("new", {} as DataType)}
              >
                + Tạo sự kiện
              </Button>
            )}
          </Row>
          <Row justify={"center"}>
            <Col>
              <Table columns={columns} dataSource={eventData} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Modal
        title={getModalTitle()}
        open={isModalOpen}
        okText={modalType === "detail" ? "Tham gia" : "Tạo"}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalType === "none" ? (
          <Spin />
        ) : (
          <Form form={form} onFinish={handleOk}>
            <Form.Item label="Tên sự kiện" name="name">
              <Input disabled={modalType === "detail"} required />
            </Form.Item>
            <Form.Item label="Thời gian bắt đầu" name="startDate">
              <DatePicker showTime disabled={modalType === "detail"} required />
            </Form.Item>
            <Form.Item label="Thời gian kết thúc" name="endDate">
              <DatePicker showTime disabled={modalType === "detail"} required />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea disabled={modalType === "detail"} required />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default App;

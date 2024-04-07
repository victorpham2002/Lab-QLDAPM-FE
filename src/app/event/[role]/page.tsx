/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React from "react";
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
  title: string;
  created_at: Date;
  start_at: Date;
  end_at: Date;
  status: string;
  description?: string;
}

const data: DataType[] = [
  {
    key: "1",
    title: "Sự kiện 1",
    created_at: new Date("2021-08-01T00:00:00"),
    start_at: new Date("2021-09-01T00:00:00"),
    end_at: new Date("2021-09-30T23:59:59"),
    status: "Đã duyệt",
    description: "Sự kiện này rất quan trọng",
  },
  {
    key: "2",
    title: "Sự kiện 2",
    created_at: new Date("2021-08-01T00:00:00"),
    start_at: new Date("2021-09-01T00:00:00"),
    end_at: new Date("2021-09-30T23:59:59"),
    status: "Chờ duyệt",
    description: "Sự kiện này cũng rất quan trọng",
  },
];

const App: React.FC<{ params: { role: string } }> = ({ params }) => {
  const role = params.role.toLowerCase() as "admin" | "organizer" | "student";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"new" | "detail" | "none">("none");
  const [form] = Form.useForm();

  const showModal = (event: string, record: DataType) => {
    if (event === "detail") {
      form.setFieldsValue({
        title: record.title,
        start_at: dayjs(record.start_at),
        end_at: dayjs(record.end_at),
        description: record.description,
      });
    }

    setIsModalOpen(true);
    setModalType(event as "new" | "detail");
  };

  const handleOk = () => {
    setIsModalOpen(false);

    if (modalType === "new") {
      // todo: create event
      const res = form.getFieldsValue(true);
      console.log("values:", res);
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
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Ngày tạo",
        dataIndex: "created_at",
        key: "created_at",
        render: (date: Date) => date.toLocaleString(),
      },
      {
        title: "Thời gian bắt đầu",
        dataIndex: "start_at",
        key: "start_at",
        render: (date: Date) => date.toLocaleString(),
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "end_at",
        key: "end_at",
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
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Ngày tạo",
        dataIndex: "created_at",
        key: "created_at",
        render: (date: Date) => date.toLocaleString(),
      },
      {
        title: "Thời gian bắt đầu",
        dataIndex: "start_at",
        key: "start_at",
        render: (date: Date) => date.toLocaleString(),
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "end_at",
        key: "end_at",
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
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Thời gian bắt đầu",
        dataIndex: "start_at",
        key: "start_at",
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "end_at",
        key: "end_at",
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
              <Table columns={columns} dataSource={data} />
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
            <Form.Item label="Tên sự kiện" name="title">
              <Input disabled={modalType === "detail"} required />
            </Form.Item>
            <Form.Item label="Thời gian bắt đầu" name="start_at">
              <DatePicker showTime disabled={modalType === "detail"} required />
            </Form.Item>
            <Form.Item label="Thời gian kết thúc" name="end_at">
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

"use client";

import React from "react";
import { Button, Card, Col, Modal, Row, Space, Spin, Table } from "antd";
import type { TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";

interface DataType {
  key: string;
  title: string;
  created_at: Date;
  start_at: string;
  end_at: string;
  status: string;
}

const data: DataType[] = [
  {
    key: "1",
    title: "Sự kiện 1",
    created_at: new Date(),
    start_at: "2021-09-01",
    end_at: "2021-09-30",
    status: "Đã duyệt",
  },
  {
    key: "2",
    title: "Sự kiện 2",
    created_at: new Date(),
    start_at: "2021-09-01",
    end_at: "2021-09-30",
    status: "Chờ duyệt",
  },
];

const App: React.FC<{ params: { role: string } }> = ({ params }) => {
  const { role } = params;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"new" | "detail" | "none">("none");

  const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsModalOpen(true);
    setModalType(e.currentTarget.value as "new" | "detail");
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getTitle = () => {
    if (role === "admin") return "Quản lý sự kiện";
    return "Danh sách sự kiện";
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
            <Button type="primary" value="detail" onClick={(e) => showModal(e)}>
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
            <Button type="primary" value="detail" onClick={(e) => showModal(e)}>
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
            <Button type="primary" value="detail" onClick={(e) => showModal(e)}>
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
              <Button type="primary" value="new" onClick={(e) => showModal(e)}>
                Tạo sự kiện
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
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalType === "none" && <Spin />}
        {modalType === "new" && <p>new</p>}
        {modalType === "detail" && <p>detail</p>}
      </Modal>
    </>
  );
};

export default App;

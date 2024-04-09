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
  Tag,
} from "antd";
import type { TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import dayjs from "dayjs";
interface DataType {
  id: string;
  name: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  status: string;
  description?: string;
}
const Event: React.FC<{
  role: string;
  approveEventById: (id: string) => Promise<{ success: boolean; data?: any }>;
  denyEventById: (id: string) => Promise<{ success: boolean; data?: any }>;
  joinEventById: (id: string) => Promise<{ success: boolean; data?: any }>;
}> = ({ role, approveEventById, denyEventById, joinEventById }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"new" | "detail" | "none">("none");
  const [eventData, setEventData] = useState<Array<DataType>>([]);
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
          setEventData((prev) => {
            if (prev) {
              return [
                ...prev,
                {
                  ...res,
                  id: data.data.id,
                  createdAt: data.data.createdAt,
                  status: data.data.status,
                },
              ];
            }
            return [{ ...res, id: data.data.id }];
          });
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

  const handleOnClickApprove = async (record: DataType) => {
    const res = await approveEventById(record.id);

    if (res.success) {
      // change the "status" inside record to "approved"
      setEventData((prev) => {
        if (prev) {
          return prev.map((item) => {
            if (item.id === record.id) {
              return { ...item, status: "APPROVED" };
            }
            return item;
          });
        }
        return prev;
      });
    }
  };

  const handleOnClickDeny = async (record: DataType) => {
    const res = await denyEventById(record.id);

    if (res.success) {
      // change the "status" inside record to "denied"
      setEventData((prev) => {
        if (prev) {
          return prev.map((item) => {
            if (item.id === record.id) {
              return { ...item, status: "DENIED" };
            }
            return item;
          });
        }
        return prev;
      });
    }
  };

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
        filters: [
          {
            text: "Approved",
            value: "APPROVED",
          },
          {
            text: "Denied",
            value: "DENIED",
          },
          {
            text: "Pending",
            value: "PENDING",
          },
          {
            text: "Outdated",
            value: "OUTDATED",
          },
        ],
        onFilter: (value, record) => record.status.startsWith(value),
        render: (value: string) => {
          let color = "geekblue";
          if (value === "APPROVED") {
            color = "green";
          } else if (value === "DENIED") {
            color = "volcano";
          } else if (value === "OUTDATED") {
            color = "red";
          }
          return <Tag color={color}>{value}</Tag>;
        },
      },
      {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => showModal("detail", record)}>
              Chi tiết
            </Button>
            <Button
              type="primary"
              ghost
              disabled={
                record.status === "APPROVED" ||
                record.status === "OUTDATED" ||
                record.status === "DENIED"
              }
              onClick={() => handleOnClickApprove(record)}
            >
              Đồng ý
            </Button>
            <Button
              danger
              disabled={
                record.status === "APPROVED" ||
                record.status === "OUTDATED" ||
                record.status === "DENIED"
              }
              onClick={() => handleOnClickDeny(record)}
            >
              Từ Chối
            </Button>
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
          </Space>
        ),
      },
    ];
  }

  const handleOnClickJoinEvent = async (record: DataType) => {
    const res = await joinEventById(record.id);

    if (res.success) {
      // change the "status" inside record to "joined"
      setEventData((prev) => {
        if (prev) {
          return prev.map((item) => {
            if (item.id === record.id) {
              return { ...item, status: "JOINED" };
            }
            return item;
          });
        }
        return prev;
      });
    }
  };

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
        render(value, record, index) {
          if (record.startDate < new Date()) {
            return <Tag color="red">Outdated</Tag>;
          }
          if (record.status === "JOINED") {
            return <Tag color="blue">Joined</Tag>;
          }
          return <Tag color="green">Available</Tag>;
        },
      },
      {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => showModal("detail", record)}>
              Chi tiết
            </Button>
            <Button
              type="primary"
              ghost
              onClick={() => handleOnClickJoinEvent(record)}
              disabled={record.status === "JOINED"}
            >
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
              <DatePicker
                showTime
                disabled={modalType === "detail"}
                required
                disabledDate={(current) => {
                  return current && current < dayjs().startOf("day");
                }}
                defaultValue={dayjs().startOf("day")}
              />
            </Form.Item>
            <Form.Item label="Thời gian kết thúc" name="endDate">
              <DatePicker
                showTime
                disabled={modalType === "detail"}
                required
                disabledDate={(current) => {
                  const startDate = form.getFieldValue("startDate");
                  return (
                    current &&
                    (current < dayjs().startOf("day") || current < startDate)
                  );
                }}
              />
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

export default Event;

import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: TableProps<DataType>["columns"] = [
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
    title: "Ngày bắt đầu",
    dataIndex: "start_at",
    key: "start_at",
  },
  {
    title: "Ngày kết thúc",
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
    dataIndex: "action",
    key: "action",
  },
];

const App: React.FC<{ params: { slug: string } }> = ({ params }) => {
  return <Table columns={columns} />;
};

export default App;

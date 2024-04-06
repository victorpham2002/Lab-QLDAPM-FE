import { Flex, Layout, Card, Row, Col } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/es/typography/Title";
export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Row style={{ height: "90vh" }}>{children}</Row>;
}

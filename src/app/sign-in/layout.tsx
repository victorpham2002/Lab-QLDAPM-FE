import { Flex, Layout, Card, Row, Col } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/es/typography/Title";
export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "90vh" }}>
      <Col span={16}>
        <Card
          style={{
            height: "60vh",
            minWidth: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Row justify="center">
            <Col>
              <Title level={3}>Đăng nhập</Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col>{children}</Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

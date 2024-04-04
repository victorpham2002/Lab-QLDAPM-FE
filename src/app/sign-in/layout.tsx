import { Flex } from "antd"

export default function AuthLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav></nav>
        <Flex style={{ height: "100%" }} justify="center" align="center">
        {children}
        </Flex>
      </section>
    )
  }
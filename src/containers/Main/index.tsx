import React from "react";
import { Layout } from "antd";

import Header from "../Header";

const { Content } = Layout;

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className="main-layout">
      <Header />
      <Layout className="main-container ">
        <Content className="content-section">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Main;

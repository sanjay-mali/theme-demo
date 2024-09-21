"use client";

import React from "react";
import { Layout, Menu, Radio, Row, Col, Card } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useTheme } from "@/context/ThemeContext";

const { Header, Content, Footer, Sider } = Layout;

const nav = [
  "User",
  "Support",
  "Downloads",
  "Analytics",
  "Cloud",
  "Apps",
  "Users",
  "Theme",
];

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `${nav[index]}`,
}));

const Main = () => {
  const { selectedTheme, setSelectedTheme, appliedTheme, themes } = useTheme();

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: appliedTheme.colorBgBase,
          color: appliedTheme.colorTextBase,
        }}
      />
      <Content style={{ overflow: "initial" }}>
        <div
          style={{
            backgroundColor: appliedTheme.colorBgBase,
            color: appliedTheme.colorTextBase,
            minHeight: "100vh",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              backgroundColor: appliedTheme.colorBgBase,
              color: appliedTheme.colorTextBase,
              paddingBottom: "12px",
            }}
          >
            Select Themes
          </h2>
          <Radio.Group
            onChange={(e) => setSelectedTheme(e.target.value)}
            value={selectedTheme}
          >
            <Row gutter={16}>
              <Col>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    borderColor: appliedTheme?.borderColor,
                  }}
                >
                  <Radio value="system">System Theme</Radio>
                </Card>
              </Col>
              {Object.keys(themes).map((key) => (
                <Col key={key}>
                  <Card
                    hoverable
                    style={{
                      textAlign: "center",
                      backgroundColor: "#fff",
                      color: "#fff",
                      borderColor: appliedTheme?.borderColor,
                    }}
                  >
                    <Radio value={key}>{key.replace(/-/g, " ")}</Radio>
                  </Card>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Created by Sanjay Mali
      </Footer>
    </>
  );
};

export default Main;

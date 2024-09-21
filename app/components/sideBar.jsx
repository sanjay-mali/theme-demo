"use client";

import React, { useEffect } from "react";
import { Layout, Radio, Row, Col, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, applySystemTheme } from "@/store/themeSlice";

const { Header, Content, Footer } = Layout;

const Main = () => {
  const dispatch = useDispatch();
  const { selectedTheme, appliedTheme, themes } = useSelector(
    (state) => state.theme
  );

  useEffect(() => {
    if (selectedTheme === "system") {
      dispatch(applySystemTheme());
    }
  }, [dispatch, selectedTheme]);

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: appliedTheme?.colorBgBase || "#fff",
          color: appliedTheme?.colorTextBase || "#000",
        }}
      />
      <Content style={{ overflow: "initial" }}>
        <div
          style={{
            backgroundColor: appliedTheme?.colorBgBase || "#fff",
            color: appliedTheme?.colorTextBase || "#000",
            minHeight: "100vh",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              backgroundColor: appliedTheme?.colorBgBase || "#fff",
              color: appliedTheme?.colorTextBase || "#000",
              paddingBottom: "12px",
            }}
          >
            Select Themes
          </h2>
          <Radio.Group
            onChange={(e) => dispatch(setTheme(e.target.value))}
            value={selectedTheme} 
          >
            <Row gutter={16}>
              <Col>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    borderColor: appliedTheme?.borderColor || "#000",
                  }}
                >
                  <Radio value="system">System Theme</Radio>
                </Card>
              </Col>
              {themes &&
                Object.keys(themes).map((key) => (
                  <Col key={key}>
                    <Card
                      hoverable
                      style={{
                        textAlign: "center",
                        backgroundColor: "#fff",
                        color: "#fff",
                        borderColor: appliedTheme?.borderColor || "#000",
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

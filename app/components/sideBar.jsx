"use client";

import React, { useEffect, useState } from "react";
import { Layout, Radio, Row, Col, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, applySystemTheme } from "@/store/themeSlice";

const { Header, Content } = Layout;

const Main = () => {
  const dispatch = useDispatch();
  const { appliedTheme, themes } = useSelector((state) => state.theme);

  const [selectedTheme, setSelectedThemeState] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      setSelectedThemeState(savedTheme);
      dispatch(setTheme(savedTheme));
    } else {
      dispatch(applySystemTheme());
    }
  }, [dispatch]);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSelectedThemeState(newTheme);
    dispatch(setTheme(newTheme));
    localStorage.setItem("selectedTheme", newTheme);
  };

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: appliedTheme?.colorBgBase || "#fff ",
          color: appliedTheme?.colorTextBase || "#000",
        }}
      />
      <Content style={{ overflow: "initial" }}>
        <div
          style={{
            backgroundColor: appliedTheme?.colorBgBase,
            color: appliedTheme?.colorTextBase,
            minHeight: "100vh",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              backgroundColor: appliedTheme?.colorBgBase,
              color: appliedTheme?.colorTextBase,
              paddingBottom: "12px",
            }}
          >
            Select Themes
          </h2>
          <Radio.Group onChange={handleThemeChange} value={selectedTheme}>
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
                        borderColor: appliedTheme?.borderColor,
                      }}
                    >
                      <Radio value={key}>{key}</Radio>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Radio.Group>
        </div>
      </Content>
    </>
  );
};

export default Main;

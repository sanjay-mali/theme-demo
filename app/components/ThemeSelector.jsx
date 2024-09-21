"use client";
import { Radio, Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/redux/themeSlice";
import { useEffect } from "react";

const themes = [
  { label: "System Theme", value: "system" },
  { label: "Light Theme", value: "light" },
  { label: "Dark Theme", value: "dark" },
  { label: "High Contrast - Light", value: "high-contrast-light" },
  { label: "High Contrast - Dark", value: "high-contrast-dark" },
];

export default function ThemeSelector() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const onChangeTheme = (e) => {
    const selectedTheme = e.target.value;
    dispatch(setTheme(selectedTheme));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Select Themes</h2>
      <p className="text-base text-gray-500 mb-8">
        Customize your application theme, make it more enjoyable and comfortable
        to use.
      </p>

      <Radio.Group onChange={onChangeTheme} value={currentTheme}>
        <Row gutter={16}>
          {themes.map((theme) => (
            <Col key={theme.value}>
              <Card
                hoverable
                style={{ width: 200, textAlign: "center" }}
                cover={
                  <div className="h-16 flex items-center justify-center">
                    <span className="theme-icon" />
                  </div>
                }
              >
                <Radio value={theme.value}>{theme.label}</Radio>
              </Card>
            </Col>
          ))}
        </Row>
      </Radio.Group>
    </div>
  );
}

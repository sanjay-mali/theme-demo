import { useThemeDetector } from "./sideBar";
import { useTheme } from "./ThemeContext";
import { Radio, Row, Col, Card } from "antd";

const ThemeSwitcher = () => {
  const { appliedTheme, handleThemeChange } = useThemeDetector(); 

  const themeOptions = [
    { label: "System Theme", value: "system" },
    { label: "Light Theme", value: "light" },
    { label: "Dark Theme", value: "dark" },
    { label: "High Contrast - Light", value: "highContrastLight" },
    { label: "High Contrast - Dark", value: "highContrastDark" },
  ];

  return (
    <div
      style={{
        backgroundColor: appliedTheme.colorBgBase,
        color: appliedTheme.colorTextBase,
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          padding: "16px",
          textAlign: "center",
          color: appliedTheme.colorPrimary,
        }}
      >
        <h1>Theme Switcher</h1>
        <p>This is an example of dynamically changing themes.</p>
        <a href="#" style={{ color: appliedTheme.colorLink }}>
          This is a link
        </a>
        <div style={{ marginTop: "16px" }}>
          <Radio.Group
            onChange={(e) => handleThemeChange(e.target.value)}
            value={appliedTheme}
          >
            <Row gutter={16}>
              {themeOptions.map((theme) => (
                <Col key={theme.value}>
                  <Card hoverable style={{ width: 200, textAlign: "center" }}>
                    <Radio value={theme.value}>{theme.label}</Radio>
                  </Card>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;

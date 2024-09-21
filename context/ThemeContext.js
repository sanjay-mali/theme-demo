import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const themes = {
  light: {
    colorPrimary: "#1890ff",
    colorBgBase: "#ffffff",
    colorTextBase: "#000000",
    colorLink: "#1890ff",
  },
  dark: {
    colorPrimary: "#177ddc",
    colorBgBase: "#1f1f1f",
    colorTextBase: "#ffffff",
    colorLink: "#177ddc",
  },
  "high-contrast-light": {
    colorPrimary: "#ff0000",
    colorBgBase: "#ffffff",
    colorTextBase: "#000000",
    colorLink: "#ff0000",
    borderColor: "#000",
  },
  "high-contrast-dark": {
    colorPrimary: "#0a0c10",
    colorBgBase: "#000000",
    borderColor: "#fff",
    colorTextBase: "#00ff00",
  },
};

export const ThemeProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [appliedTheme, setAppliedTheme] = useState(themes.light);

  const updateTheme = () => {
    if (selectedTheme === "system") {
      setAppliedTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? themes.dark
          : themes.light
      );
    } else {
      setAppliedTheme(themes[selectedTheme]);
    }
  };

  useEffect(() => {
    updateTheme();

    const handleSystemThemeChange = (e) => {
      if (selectedTheme === "system") {
        setAppliedTheme(e.matches ? themes.dark : themes.light);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider
      value={{ selectedTheme, setSelectedTheme, appliedTheme, themes }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

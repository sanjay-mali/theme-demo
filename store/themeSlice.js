import { createSlice } from "@reduxjs/toolkit";

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

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("selectedTheme");
    return savedTheme ? savedTheme : "system";
  }
  return "system";
};

const initialState = {
  selectedTheme: getInitialTheme(),
  appliedTheme: getInitialTheme() || "system",
  themes,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.selectedTheme = action.payload;
      if (action.payload === "system") {
        state.appliedTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? themes.dark
          : themes.light;
      } else {
        state.appliedTheme = state.themes[action.payload];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("selectedTheme", action.payload);
      }
    },
    applySystemTheme: (state) => {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      state.appliedTheme = systemPrefersDark ? themes.dark : themes.light;
    },
  },
});

export const { setTheme, applySystemTheme } = themeSlice.actions;
export default themeSlice.reducer;

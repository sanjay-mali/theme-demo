import { createSlice } from "@reduxjs/toolkit";

// Define your theme data
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

// Retrieve theme from localStorage
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("selectedTheme");
  return savedTheme ? savedTheme : "system"; // Default to 'system' if no saved theme
};

const initialState = {
  selectedTheme: getInitialTheme(),
  appliedTheme: themes.light, // Default applied theme
  themes, // Include themes in the state
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
      // Save selected theme to localStorage
      localStorage.setItem("selectedTheme", action.payload);
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

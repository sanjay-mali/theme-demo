"use client";

import { ConfigProvider } from "antd";
import Main from "./components/sideBar";
import { ThemeProvider } from "@/context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

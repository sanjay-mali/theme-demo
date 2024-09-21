"use client";

import { ConfigProvider } from "antd";
import Main from "./components/sideBar";
import { ThemeProvider } from "@/context/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

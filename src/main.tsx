import "@ant-design/v5-patch-for-react-19";

import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "var(--color-primary)",
            colorPrimaryHover: "rgba(0, 235, 125, 0.7)",
            colorPrimaryActive: "rgba(0, 235, 125, 0.3)",
            ghostBg: "transparent",
            borderRadius: 10,
            fontWeight: 600,
            colorText: "var(--color-grey-1)",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);

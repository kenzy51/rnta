import ReactDOM from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./app/providers/ErrorBoundary/ErrorBoundary";
import "./global.css";
import { ConfigProvider } from "antd";
import React from "react";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ErrorBoundary>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FF007E",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </ErrorBoundary>
  </BrowserRouter>
);

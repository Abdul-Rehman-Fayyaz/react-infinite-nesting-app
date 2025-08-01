import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          hashed: false,
          token: {
            fontFamily: "Montserrat",
          },
        }}
        wave={{ disabled: true }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";
import "./index.css";
import { UserProvider } from "./context/user/UserProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ProSidebarProvider>
  </React.StrictMode>
);

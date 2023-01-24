import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";
import "./index.css";
import { UserProvider } from "./context/user/UserProvider";
import { CategoryContextProvider } from "./context/category/CategoryProvider";
import SimpleSnackbar from "./components/Snackbar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <UserProvider>
        <CategoryContextProvider>
          <SimpleSnackbar />
          <App />
        </CategoryContextProvider>
      </UserProvider>
    </ProSidebarProvider>
  </React.StrictMode>
);

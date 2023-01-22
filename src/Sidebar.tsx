import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useUser } from "./context/user/UserProvider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";

function Layout() {
  const { collapseSidebar } = useProSidebar();
  const { isAdminPresent }: any = useUser();
  const [admin, setAdmin] = useState({}) as any;
  const navigate = useNavigate();

  const localStorageItems = () => {
    const getAdminFromLocal: any = localStorage.getItem("admin");
    const localvalue = JSON.parse(getAdminFromLocal);
    if (localvalue) {
      setAdmin(localvalue[0].admin);
    }
  };

  useEffect(() => {
    localStorageItems();
  }, [isAdminPresent]);

  return (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <Sidebar
          rootStyles={{
            height: "100vh",
            background: "white",
          }}
        >
          <Menu>
            <Box
              sx={{
                height: "200px",
                borderBottom: "1px dashed grey",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                height="80"
                style={{ borderRadius: "50%" }}
                alt=""
              />
              <Typography style={{ color: "teal" }}>{admin?.email}</Typography>
              <Button
                onClick={() => {
                  localStorage.removeItem("admin");
                  navigate("/signin");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </Box>
            <MenuItem routerLink={<Link to="/dashboard" />}>
              <Box sx={{ display: "flex", justifyContent: "baseline" }}>
                <div style={{ color: "#2980b9", marginRight: "5px" }}>
                  <DashboardIcon />
                </div>
                <Typography>Dashboard</Typography>
              </Box>
            </MenuItem>
            <MenuItem routerLink={<Link to="/products" />}>
              <Box sx={{ display: "flex", justifyContent: "baseline" }}>
                <div style={{ color: "#2980b9", marginRight: "5px" }}>
                  <Inventory2Icon />
                </div>
                <Typography>Product</Typography>
              </Box>
            </MenuItem>
            <MenuItem routerLink={<Link to="/category" />}>
              <Box sx={{ display: "flex", justifyContent: "baseline" }}>
                <div style={{ color: "#2980b9", marginRight: "5px" }}>
                  <CategoryIcon />
                </div>
                <Typography>Category</Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

export default Layout;

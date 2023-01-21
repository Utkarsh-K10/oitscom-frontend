import { Button } from "@mui/material";
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
import { Link } from "react-router-dom";
import { useUser } from "./context/user/UserProvider";

function Layout() {
  const { collapseSidebar } = useProSidebar();
  const { isAdminPresent }: any = useUser();
  const [admin, setAdmin] = useState({}) as any;

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
          }}
        >
          <Menu>
            <Paper elevation={3} sx={{ height: "auto" }}>
              <Typography style={{ color: "teal" }} variant={"h6"}>
                {admin?.email}
              </Typography>
              <Button
                onClick={() => {
                  localStorage.removeItem("admin");
                }}
                variant="contained"
              >
                Logout
              </Button>
            </Paper>
            <SubMenu label="Charts">
              <MenuItem> Pie charts </MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem routerLink={<Link to="/dashboard" />}>Dashboard</MenuItem>
            <MenuItem routerLink={<Link to="/products" />}> Product</MenuItem>
            <MenuItem> E-commerce</MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

export default Layout;

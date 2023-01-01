import {Sidebar, Menu, MenuItem, useProSidebar, SubMenu} from 'react-pro-sidebar';
import {Link} from "react-router-dom";

function Layout() {
    const { collapseSidebar } = useProSidebar();

    return (
        <>
            <div style={{ display: 'flex', height: '100%' }}>
                <Sidebar  rootStyles={{
                   height:"100vh"
                }}>
                    <Menu>
                        <SubMenu label="Charts">
                            <MenuItem> Pie charts </MenuItem>
                            <MenuItem> Line charts </MenuItem>
                        </SubMenu>
                        <MenuItem routerLink={<Link to="/dashboard"/>}> Dashboard</MenuItem>
                        <MenuItem routerLink={<Link to="/products" />}> Product</MenuItem>
                        <MenuItem> E-commerce</MenuItem>
                    </Menu>
                </Sidebar>

            </div>
        </>

    );
}

export default  Layout
import { useState } from "react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { items } from "./sideBarItems";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{minWidth:'1000px'}}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  );
};

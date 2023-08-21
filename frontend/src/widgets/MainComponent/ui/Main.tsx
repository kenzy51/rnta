import { useState } from "react";
import { DesktopOutlined, FileOutlined, PieChartOutlined} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import cls from './Main.module.scss';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Отчеты", "1", <PieChartOutlined />),
  getItem("Сводка", "2", <DesktopOutlined />),
  getItem("Файлы", "9", <FileOutlined />),
];

export const Main: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className={cls.wrapper}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
           <h2>Контентная часть</h2>
          </Content>
          <Footer style={{ textAlign: "center" }}>Runita</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  DesktopOutlined,
  HomeOutlined,
  DollarOutlined,
  CrownOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode, 
  key: React.Key, 
  icon?: React.ReactNode, 
  children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
export const items: MenuItem[] = [
  getItem(<Link to="/">Главная</Link>, "4", <HomeOutlined />),
  // getItem(<Link to="/reports">Отчеты</Link>, "1", <PieChartOutlined />),
  getItem(<Link to="/summary">Сводка</Link>, "2", <DesktopOutlined />),
  getItem(<Link to="/expenses">Затраты</Link>, "5", <DollarOutlined />),
  // getItem(<Link to="/files">Файлы</Link>, "3", <FileOutlined />),
  getItem(<Link to="/bonuses">Бонусы</Link>, "6", <CrownOutlined />),
];

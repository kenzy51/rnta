import { Tabs } from "antd";
import { items } from "./tabItems";

export const ExpensesPage = () => {
  return <Tabs items={items} size='small'/>;
};
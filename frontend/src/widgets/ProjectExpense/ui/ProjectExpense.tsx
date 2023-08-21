import { Tabs } from "antd";
import { ProjectExpenseList } from "./ProjectExpenseList";
import { CreateExpense } from "src/widgets/CreateProjectExpense";

const items = [
  {
    key: "1",
    label: "Все затраты по проектам",
    children: <ProjectExpenseList />,
  },
  {
    key: "2",
    label: "Создать затраты по проектам",
    children: <CreateExpense />,
  },
];
export const ProjectExpense = () => {
  return (
    <div>
      <Tabs items={items} />
    </div>
  );
};

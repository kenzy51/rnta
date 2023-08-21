import { SummaryTable } from "src/widgets/SummaryTable";
import { TabsProps } from "antd";
import { CreateSummary } from "src/widgets/CreateSummary";

export const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Создать счет`,
    children: <CreateSummary />,
  }, 
  {
    key: "2",
    label: `Сводка`,
    children: <SummaryTable />,
  },
];

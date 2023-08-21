import { TabsProps } from "antd";
import { CreateProjectAgent } from "src/widgets/CreateProjectAgent/ui/CreateProjectAgent";
import { CreateService } from "src/widgets/CreateService";
import { CreateProjectLabor } from "src/widgets/CreateProjectLabor";
import { CreateProjectReward } from "src/widgets/CreateProjectRewards";
import { ProjectExpense } from "src/widgets/ProjectExpense";

export const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Затраты по проектам`,
    children: <ProjectExpense />,
  },
  {
    key: "2",
    label: `Проектные агенты`,
    children: <CreateProjectAgent />,
  },
  {
    key: "3",
    label: `Трудозатрата`,
    children: <CreateProjectLabor />,
  },
  {
    key: "4",
    label: `Создание проектного вознаграждения`,
    children: <CreateProjectReward />,
  },
  {
    key: "5",
    label: `Услуги`,
    children: <CreateService />,
  },
];
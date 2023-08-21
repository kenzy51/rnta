import { TabsProps } from "antd";
import { ClientEntity } from "src/widgets/ClientEntity";
import { Users } from "src/widgets/UsersEntity/Users";
import { Profile } from "src/widgets/Profile";
import { Projects } from "src/widgets/Projects/ui/Projects";

export const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Таблица клиентов`,
    children: <ClientEntity />,
  },
  {
    key: "2",
    label: `Пользователи`,
    children: <Users />,
  },
  {
    key: "3",
    label: `Проекты`,
    children: <Projects/>,
  },
  {
    key: "4",
    label: `Профиль`,
    children: <Profile/>,
  },
];

import { Tabs } from "antd";
import { CreateUser, UsersList } from ".";

export const Users = () => {
  const items = [
    {
      key: "1",
      label: "Список пользователей",
      children: <UsersList />,
    },
    {
      key: "2",
      label: "Создать специалиста",
      children: <CreateUser />,
    },
  ];
  return <Tabs items={items} />;
};

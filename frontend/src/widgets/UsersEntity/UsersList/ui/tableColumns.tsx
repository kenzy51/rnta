import { Tag } from "antd";

export const columns: Array<any> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Имя пользователя",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Имя",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Фамилия",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Почта",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Роль",
    dataIndex: "role",
    key: "role",
    render: (role) => {
      let color = '';
      switch (role) {
        case 'ADMIN':
          color = 'geekblue';
          break;
        case 'MANAGER':
          color = 'green';
          break;
        default:
          color = 'default';
      }
      return (
        <Tag color={color} key={role}>
          {role.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Зар.плата",
    dataIndex: "salary",
    key: "salary",
  },
  {
    title: "Часовая ставка",
    dataIndex: "hour_rate",
    key: "hour_rate",
  },
];

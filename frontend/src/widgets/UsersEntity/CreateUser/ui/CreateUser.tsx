import { Form, Input, Button, Select } from "antd";
import { usersStore } from "src/shared/store/users/service/usersStore";
import { UserType } from "src/shared/store/users/types";
import { observer } from "mobx-react-lite";

export interface OptionType {
  value: string;
  label: string;
}
export const CreateUser: React.FC = observer(() => {
  const [form] = Form.useForm();

  const onFinish = async (values: UserType) => {
    try {
      await usersStore.createUser(values);
    } catch (e) {
      console.error(e);
    }
  };

  const roleOptions: Array<OptionType> = [
    { value: "OWNER", label: "Владелец" },
    { value: "ADMIN", label: "Админ" },
    { value: "MANAGER", label: "Менеджер" },
    { value: "SEO_SPECIALIST", label: "SEO-специалист" },
    { value: "CONTEXT_SPECIALIST", label: "Контекстный специалист" },
    { value: "TARGET_SPECIALIST", label: "Целевой специалист" },
  ];

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name="first_name" label="Имя" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="last_name" label="Фамилия" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Почта" rules={[{ required: true, type: "email" }]}>
        <Input />
      </Form.Item>

      <Form.Item name="role" label="Специализация" rules={[{ required: true }]}>
        <Select>
          {roleOptions.map((option: OptionType) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="salary" label="Зaр.плата" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="hour_rate" label="Часовая ставка" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
});

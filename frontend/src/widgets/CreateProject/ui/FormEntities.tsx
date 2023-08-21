import { DatePicker, Form, Input, Select } from "antd";

export const ProjectName = () => {
  return (
    <Form.Item
      label="Название проекта"
      name="name"
      rules={[{ required: true, message: "Введите название проекта" }]}
    >
      <Input />
    </Form.Item>
  );
};

export const BudgetType = () => {
  return (
    <Form.Item
      label="Тип бюджета"
      name="budget_type"
      rules={[{ required: true, message: "Введите тип бюджета" }]}
    >
      <Select>
        <Select.Option value="variable">Переменный</Select.Option>
        <Select.Option value="fixed">Фиксированный</Select.Option>
      </Select>
    </Form.Item>
  );
};

export const Budget = () => {
  return (
    <Form.Item
      label="Бюджет"
      name="budget_amount"
      rules={[{ required: true, message: "Введите бюджет" }]}
    >
      <Input />
    </Form.Item>
  );
};
export const ExpenseAmount = () => {
  return (
    <Form.Item
      label="Затратная часть"
      name="expenses_amount"
      rules={[{ required: true, message: "Введите затратную часть" }]}
    >
      <Input />
    </Form.Item>
  );
};

export const AgentComissionType = () => {
  return (
    <Form.Item
      label="Тип комиссии агента"
      name="agent_commission_type"
      rules={[{ required: true, message: "Введите тип комиссии агента" }]}
    >
      <Select>
        <Select.Option value="percentage">Процент</Select.Option>
        <Select.Option value="fixed">Фиксированный</Select.Option>
      </Select>
    </Form.Item>
  );
};

export const AgentComission = () => {
  return (
    <Form.Item
      label="Комиссия агента"
      name="agent_commission"
      rules={[{ required: true, message: "Введите комиссию агента" }]}
    >
      <Input />
    </Form.Item>
  );
};

export const Revenue = () => {
  return (
    <Form.Item label="Выручка" name="revenue" rules={[{ required: true, message: "Введите выручку" }]}>
      <Input />
    </Form.Item>
  );
};

export const Profit = () => {
  return (
    <Form.Item label="Прибыль" name="profit" rules={[{ required: true, message: "Введите прибыль" }]}>
      <Input />
    </Form.Item>
  );
};

export const TotalLabor = () => {
  return (
    <Form.Item
      label="Трудозатраты всего"
      name="total_labor"
      rules={[{ required: true, message: "Введите трудозатрату всего" }]}
    >
      <Input />
    </Form.Item>
  );
};

export const StartDate = () => {
  return (
    <Form.Item
      label="Дата начала"
      name="start_date"
      rules={[{ required: true, message: "Введите дату начала" }]}
    >
      <DatePicker placeholder="Выберите дату" />
    </Form.Item>
  );
};

export const EndDate = () => {
  return (
    <Form.Item
      label="Дата окончания"
      name="end_date"
    >
      <DatePicker placeholder="Выберите дату" />
    </Form.Item>
  );
};
// export const DeleteDate = () => {
//   return (
//     <Form.Item
//       label="Delete Date"
//       name="delete_date"
//       rules={[{ required: true, message: "" }]}
//     >
//       <Input />
//     </Form.Item>
//   );
// };

export const Service = () => {
  return (
    <Form.Item label="Услуга" name="service" rules={[{ required: true, message: "Введите услугу" }]}>
      <Input />
    </Form.Item>
  );
};

export const Agent = () => {
  return (
    <Form.Item label="Агент" name="agent" rules={[{ required: true, message: "Введите агента" }]}>
      <Input />
    </Form.Item>
  );
};

export const ServiceDetails = () => {
  return (
    <Form.Item
      label="Подробнее об услуге"
      name="service_details"
      rules={[{ required: true, message: "Напишите подробнее об услуге" }]}
    >
      <Input />
    </Form.Item>
  );
};
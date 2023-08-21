import { layoutProps } from 'src/shared/consts/uiConsts';
import { Form, Input } from 'antd';

const { TextArea } = Input;

export const ProjectExpensesFormFields = [
  {
    name: "stock_market",
    label: "Биржа",
    placeholder: "Введите биржу",
    component: (
      <Form.Item name="stock_market" label="Биржа" {...layoutProps}>
        <Input placeholder="Введите биржу" />
      </Form.Item>
    ),
  },
  {
    name: "budget_request",
    label: "Запрос бюджета",
    placeholder: "Выберите Бюджет",
    component: (
      <Form.Item name="budget_request" label="Запрос бюджета" {...layoutProps}>
        <Input placeholder="Выберите Бюджет" />
      </Form.Item>
    ),
  },
  {
    name: "spent",
    label: "Потрачено",
    placeholder: "Потрачено",
    component: (
      <Form.Item name="spent" label="Потрачено" {...layoutProps}>
        <Input placeholder="Потрачено" />
      </Form.Item>
    ),
  },
  {
    name: "commission",
    label: "Комиссия",
    placeholder: "Введите комиссию",
    component: (
      <Form.Item name="commission" label="Комиссия" {...layoutProps}>
        <Input placeholder="Введите комиссию" />
      </Form.Item>
    ),
  },
  {
    name: "amount",
    label: "Сумма",
    placeholder: "Введите сумму",
    component: (
      <Form.Item name="amount" label="Сумма" {...layoutProps}>
        <Input placeholder="Введите сумму" />
      </Form.Item>
    ),
  },
  {
    name: "project_comment",
    label: "Комментарий к проекту",
    placeholder: "",
    component: (
      <Form.Item name="project_comment" label="Комментарий к проекту" {...layoutProps}>
        <TextArea placeholder="" />
      </Form.Item>
    ),
  },
  {
    name: "expense_comment",
    label: "Комментарий к расходу",
    placeholder: "Введите комментарий",
    component: (
      <Form.Item name="expense_comment" label="Комментарий к расходу" {...layoutProps}>
        <TextArea placeholder="Введите комментарий" />
      </Form.Item>
    ),
  },
];

import { Button, DatePicker, Form, Input, Select } from "antd";
// import TextArea from "antd/es/input/TextArea";
import { ReactNode } from "react";
const {TextArea} = Input;
export const InvoiceNumber = () => {
  return (
    <Form.Item
      name="invoice_number"
      label="Номер счета"
      rules={[{ required: true, message: "Номер счета обязателен" }]}
    >
      <Input />
    </Form.Item>
  );
};

export const LegalPerson = () => {
  const options = [
    { value: "RUNIT", label: `ООО "РУНИТА"` },
    { value: "RA_RUNIT", label: `ООО "РА РУНИТА"` },
    { value: "Uvarova", label: "ИП Уварова" },
  ];
  return (
    <Form.Item
      name="legal_person"
      label="Юр.Лицо"
      rules={[{ required: true, message: " Поле Юр-лицо обязательно" }]}
    >
      <Select style={{ width: 220 }} options={options} />
    </Form.Item>
  );
};

export const PaymentPurpose = () => {
  return (
    <Form.Item
      name="payment_purpose"
      label="Основание платежа"
      rules={[{ required: true, message: "Основание платежа обязательна" }]}
    >
      <TextArea />
    </Form.Item>
  );
};

export const Amount = () => {
  return (
    <Form.Item
      name="amount"
      label="Сумма"
      rules={[{ required: true, message: "Сумма обязательна" }]}
    >
      <Input />
    </Form.Item>
  );
};

export const PaymentDate = () => {
  return (
    <Form.Item
      name="payment_date"
      label="Дата оплаты(если не указана,датой будет сегодняшнее число)"
    >
      <DatePicker placeholder="Введите дату" />
    </Form.Item>
  );
};
export const BillingDate = () => {
  return (
    <Form.Item
      name="billing_date"
      label="Дата выставления счета(если не указана,датой будет сегодняшнее число)"
    >
      <DatePicker placeholder="Введите дату" />
    </Form.Item>
  );
};

export const Comment = () => {
  return (
    <Form.Item name="comment" label="Комментарий">
      <Input.TextArea />
    </Form.Item>
  );
};

interface ChildrenType {
  children: ReactNode;
}
export const SubmitButton = ({ children }: ChildrenType) => {
  return (
    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        style={{ background: " linear-gradient(to left, #F67D37, #FF007E)" }}
      >
        {children}
      </Button>
    </Form.Item>
  );
};

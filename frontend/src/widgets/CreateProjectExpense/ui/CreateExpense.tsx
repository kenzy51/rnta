import { Fragment, useState } from "react";
import { Form, Button, DatePicker, notification } from "antd";
import { projectExpenseStore } from "src/shared/store/projectExpense/service/projectExpenseStore";
import { ExpenseType } from "src/shared/store/projectExpense/types";
import { FindProject } from "src/shared/ui/FindProject";
import moment from "moment";
import { observer } from "mobx-react-lite";
import { ProjectExpensesFormFields } from "./ProjectExpensesFields";

export const CreateExpense = observer(() => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject]: any = useState('');
  const [selectedProjectName, setSelectedProjectName] = useState("");

  const handleSubmit = async (values: ExpenseType) => {
    setLoading(true);
    try {
      values.project = selectedProject;
      values.month_request = moment(values.month_request).format("YYYY-MM-DD");
      values.paid_date = moment(values.paid_date).format("YYYY-MM-DD");
      await projectExpenseStore.createProjectExpense(values, selectedProjectName);
    } catch (error: any) {
      if (error.status === 400) {
        notification.error({
          message: "Error",
          description: "An error occurred while creating the expense.",
        });
      }
      console.error("An error occurred while creating the expense:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="" style={{ height: "80vh", overflow: "auto" }}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
      {ProjectExpensesFormFields.map((field: any) => (
            <Fragment key={field.name}>
              {field.component}
            </Fragment>
          ))}
        <Form.Item name="month_request" label="Месяц запрос бюджета">
          <DatePicker placeholder="" />
        </Form.Item>
        <Form.Item name="paid_date" label="Дата оплаты">
          <DatePicker placeholder="Выберите дату оплаты" />
        </Form.Item>
        <FindProject setSelectedProjectId={setSelectedProject} setSelectedProjectName={setSelectedProjectName} />
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Создать
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

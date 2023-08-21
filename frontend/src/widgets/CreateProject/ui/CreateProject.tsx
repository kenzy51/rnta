import { useState } from "react";
import { Form, Modal, message } from "antd";
import { projectStore } from "src/shared/store/project/service/projectStore";
import { ProjectType } from "src/shared/store/project/types";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { FindClient } from "src/shared/ui/FindClient";
import {
  AgentComission,
  Budget,
  BudgetType,
  EndDate,
  ExpenseAmount,
  Profit,
  ProjectName,
  Revenue,
  StartDate,
  TotalLabor,
} from "./FormEntities";
import { SubmitButton } from "src/widgets/CreateSummary/ui/FormEntities";
import { FindService } from "src/shared/ui/FindService";
import { FindAgent } from "src/shared/ui/FindAgent/FindAgent";
interface IModalProps{
  visible:boolean,
  setVisible:(arg:boolean)=> void
}
export const CreateProject = observer(({ visible, setVisible }: IModalProps) => {
  const [loading, setLoading] = useState(false);
  console.log(loading)
  const [selectedClientId, setSelectedClientId]: any = useState(null);
  const [selectedServiceId, setSelectedServiceId]: any = useState(null);
  const [selectedAgentId, setSelectedAgentId]: any = useState(null);
  const onFinish = async (values: ProjectType) => {
    setLoading(true);
    try {
      values.start_date = moment(values.start_date).format("YYYY-MM-DD");
      values.end_date = moment(values.end_date).format("YYYY-MM-DD");
      values.client = selectedClientId;
      values.service = selectedServiceId;
      values.agent = selectedAgentId;
      await projectStore.createProjectExpense(values);
      setVisible(false);
    } catch (error) {
      message.error("Failed to create project");
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
      <h1>Создать проект</h1>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ overflow: "auto", maxHeight: "86vh" }}
      >
        <ProjectName />
        <BudgetType />
        <Budget />
        <ExpenseAmount />
        <AgentComission />
        <Revenue />
        <Profit />
        <TotalLabor />
        <StartDate />
        <EndDate />
        <FindClient setSelectedClientId={setSelectedClientId} />
        <FindService setSelectedServiceId={setSelectedServiceId} />
        <FindAgent setSelectedAgentId={setSelectedAgentId} />

        <SubmitButton>Создать проект</SubmitButton>
      </Form>
    </Modal>
  );
});

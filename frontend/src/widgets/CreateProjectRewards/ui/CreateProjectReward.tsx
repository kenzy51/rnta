import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { observer } from "mobx-react-lite";
import { projectRewardsStore } from "src/shared/store/projectSystemRewards/service/projectSystemRewardsStore";
import { ProjectSystemRewardsType } from "src/shared/store/projectSystemRewards/types";
import { FindProject } from "src/shared/ui/FindProject";

export const CreateProjectReward = observer(() => {
  const [projectId, setProjectId]: any = useState(null);
  const onFinish = async (values: ProjectSystemRewardsType) => {
    try {
      values.project = projectId;
      await projectRewardsStore.createProjectRewards(values);
    } catch (error) {
      message.error("Failed to create project reward");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Создать проектное(системное) вознаграждение</h1>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="Рекламная система" name="exchange" rules={[{ required: true, message: "Введите биржу" }]}>
          <Input placeholder="Введите рекламную систему" />
        </Form.Item>
        <Form.Item label="Сумма" name="amount" rules={[{ required: true, message: "Введите сумму" }]}>
          <Input placeholder="Введите сумму" />
        </Form.Item>
        <Form.Item label="Комментарий" name="comment" rules={[{ required: true, message: "Введите комментарий" }]}>
          <Input placeholder="Введите комментарий" />
        </Form.Item>
        <FindProject setSelectedProjectId={setProjectId} />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
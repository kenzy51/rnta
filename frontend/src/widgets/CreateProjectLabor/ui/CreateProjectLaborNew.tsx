import React from "react";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Form,
  Input,
  Button,
  InputNumber,
  notification,
} from "antd";
import { projectLaborStore } from "src/shared/store/projectLabors/service/projectLaborStore";
import { ProjectLaborType } from "src/shared/store/projectLabors/types";
import { FindProject } from "src/shared/ui/FindProject/FindProject";
import { FindEmployee } from "src/shared/ui/FindEmployee";
import { ProjectLaborApi } from "src/shared/store/projectLabors/api/projectLaborsApi";
import { useForm } from "antd/es/form/Form";
export const CreateProjectLaborNew = observer(() => {
  const [selectedProject, setSelectedProject]: any = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  console.log(selectedProjectName);
  const [selectedSpecialist, setSelectedSpecialist]: any = useState("");
  
  const onFinish = async (values: ProjectLaborType) => {
    try {
      values.project = selectedProject;
      values.employee = selectedSpecialist;
      await projectLaborStore.createProjectLabor(values);
    } catch (error) {
      alert(`error happened ${error}`);
    }
  };
  const [form] = useForm();

  const handleUpdateDataProjectLabor = () => {
    try {
      ProjectLaborApi.updateProjectLaborData();
      notification.success({
        message: "Расчет прошел успешно",
      });
    } catch (e) {
      console.error(e);
      notification.error({
        message: "Возникла ошибка при создании расчета",
      });
    }
  };

  
  const handleMinuteChange = (value: number | undefined) => {
    if (value !== undefined && value > 59) {
      return;
    }
  };

  return (
    <div>
      <h2>Создать трудозатрату</h2>
      <Form onFinish={onFinish} form={form}>
        <Form.Item label="Часы" name="hours">
          <InputNumber max={500} />
        </Form.Item>
        <Form.Item label="Минуты" name="minutes">
          <InputNumber
            max={59}
            onChange={handleMinuteChange as (value: 59 | null) => void}
          />
        </Form.Item>
        <Form.Item label="Комментарий" name="comment" >
          <Input.TextArea />
        </Form.Item>

        <FindProject
          setSelectedProjectId={setSelectedProject}
          setSelectedProjectName={setSelectedProjectName}
        />
        <FindEmployee setSelectedSpecialist={setSelectedSpecialist} />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={() => handleUpdateDataProjectLabor()}>Рассчитать</Button>
    </div>
  );
});

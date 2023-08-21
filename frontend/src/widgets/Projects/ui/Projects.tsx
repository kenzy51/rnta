import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  notification,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { projectStore } from "src/shared/store/project/service/projectStore";
import { observer } from "mobx-react-lite";
import { columns } from "./tableColumns";
import { CreateProject } from "../../CreateProject/index";
import {
  AgentComission,
  Budget,
  BudgetType,
  ExpenseAmount,
  Profit,
  ProjectName,
  Revenue,
  TotalLabor,
} from "src/widgets/CreateProject/ui/FormEntities";
import { FindAgent } from "src/shared/ui/FindAgent/FindAgent";
import { FindService } from "src/shared/ui/FindService";
import { FindClient } from "src/shared/ui/FindClient";
import { ProjectApi } from "src/shared/store/project/api/projectApi";
import { ProjectLaborModal } from "./ProjectLaborModal";
import { styled } from "styled-components";
import FileSaver from "file-saver";
import { StyledTopComponent } from "src/widgets/ClientEntity/ui/ClientEntity";

export const Projects = observer(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [editingProject, setEditingProject]: any = useState(null);
  const [form] = Form.useForm();

  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [agent, setAgent] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [projectLaborModalOpen, setProjectLaborModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    projectStore.fetchProject();
  }, []);
  const isLoading = projectStore.loading;

  const paginationConfig = {
    pageSize: 50,
    hideOnSinglePage: true,
  };

  const updatedColumns = [
    ...columns,
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (_: any, record: any) => (
        <>
          <EditOutlined
            style={{ marginRight: 8 }}
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            onConfirm={() => projectStore.deleteProjectExpense(record.id)}
            title="Удаляя данный проект, вы удалите сводку связанную с данным проектом,вы уверены?"
            okText="Да"
            cancelText="Нет"
          >
            <DeleteOutlined />
          </Popconfirm>
          <ClockCircleOutlined
            onClick={() => setProjectLaborModal(record.id)}
          />
        </>
      ),
    },
  ];

  const showEditModal = (project: any) => {
    setEditingProject(project);
    form.resetFields();
    form.setFieldsValue(project);
    setVisible(true);
  };

  const props = {
    columns: updatedColumns,
    dataSource: projectStore.projects,
    rowKey: "id",
    pagination: paginationConfig,
    loading: isLoading,
  };
  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      values.client = client;
      values.agent = agent;
      values.service = service;
      const updatedProject = { ...editingProject, ...values };
      await projectStore.updateProjectExpense(
        updatedProject,
        updatedProject.id
      );
      setIsVisible(false);
    } catch (error) {}
  };

  const handleUpdateDataProject = () => {
    try {
      ProjectApi.updateProjectData();
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
  //
  const setProjectLaborModal = (projectId: any) => {
    setSelectedProjectId(projectId);
    setProjectLaborModalOpen(true);
  };
  //

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      ProjectApi.importProjectsExcel(selectedFile);
    }
    else {
      notification.info({
        message: "Выберите файл",
      });
    }
  };

  // EXPORT XLS

  const exportFetchDocument = () => {
    ProjectApi.exportProjectDocument()
      .then((response) => {
        const filename = getFilenameFromResponseHeaders(response.headers);
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel",
        });
        FileSaver.saveAs(blob, filename);
      })
      .catch((e) => {
        notification.error({
          message: "Произошла ошибка",
        });
      });
  };

  const getFilenameFromResponseHeaders = (headers) => {
    const contentDispositionHeader = headers["content-disposition"];
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDispositionHeader);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, "");
    }
    return `projects.xls`;
  };

  //
  return (
    <div>
      <StyledTopComponent>
        <StyledImportComponent>
          <h2>Импорт документа по проектам</h2>
          <Input onChange={handleFileSelect} type="file" />
          <Button onClick={handleFileUpload}>Загрузить</Button>
        </StyledImportComponent>

        <StyledImportComponent>
          <h2>Экспорт документа</h2>
          <Button onClick={() => exportFetchDocument()}>Загрузить</Button>{" "}
        </StyledImportComponent>
      </StyledTopComponent>

      <Button onClick={() => setIsVisible(true)} type="primary">
        Создать проект
      </Button>
      <Table {...props} />
      <Button onClick={() => handleUpdateDataProject()}>Рассчитать</Button>
      <CreateProject visible={isVisible} setVisible={setIsVisible} />
      <ProjectLaborModal
        open={projectLaborModalOpen}
        setOpen={setProjectLaborModalOpen}
        projectId={selectedProjectId}
      />
      <Modal
        open={Visible}
        title="Редактировать проект"
        okText="Сохранить"
        cancelText="Отмена"
        onCancel={() => setVisible(false)}
        onOk={handleEditSubmit}
      >
        <Form form={form} layout="vertical">
          <ProjectName />
          <BudgetType />
          <Budget />
          <ExpenseAmount />
          <AgentComission />
          <Revenue />
          <Profit />
          <TotalLabor />
          <FindClient setSelectedClientId={setClient} />
          <FindService setSelectedServiceId={setService} />
          <FindAgent setSelectedAgentId={setAgent} />
        </Form>
      </Modal>
    </div>
  );
});

export const StyledImportComponent = styled.div`
  width: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1%;
  margin-bottom: 1%;
`;

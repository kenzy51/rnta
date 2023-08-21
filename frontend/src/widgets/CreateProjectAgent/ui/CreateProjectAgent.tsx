import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import FileSaver from "file-saver";
import { Form, Button, Table, Popconfirm, Input, Modal, notification } from "antd";
import { projectAgentStore } from "src/shared/store/projectAgent/service/projectAgentStore";
import { ProjectAgentType } from "src/shared/store/projectAgent/types";
import { columns } from "./tableColumns";
import { CreateAgentModal } from "./CreateModal";
import { layoutProps } from "src/shared/consts/uiConsts";
import { EditOutlined, DeleteOutlined  } from "@ant-design/icons";
import { ProjectAgentApi } from "src/shared/store/projectAgent/api/projectAgentApi";
import { StyledImportComponent } from "src/widgets/Projects/ui/Projects";
import { StyledTopComponent } from "src/widgets/ClientEntity/ui/ClientEntity";

export const CreateProjectAgent: React.FC = observer(() => {
  const [visible, setVisible] = useState(false);
  const [editingId, setEditingId]: any = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form] = Form.useForm();

  const paginationConfig = {
    pageSize: 50,
    hideOnSinglePage: true,
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    const projectAgent = projectAgentStore.ProjectAgent.find(
      (item) => item.id === id
    );
    if (projectAgent) {
      form.setFieldsValue(projectAgent);
    }
    setModalVisible(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(false);
  };

  const handleSave = async (id: string) => {
    try {
      const values = await form.validateFields();
      await projectAgentStore.updateProjectExpense(values, id);
      handleCancelEdit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await projectAgentStore.deleteProjectExpense(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      ProjectAgentApi.importAgentsExcel(selectedFile);
    }
    else {
      notification.info({
        message: "Выберите файл",
      });
    }
  };
  const updatedColumns = [
    ...columns,
    {
      title: "",
      key: "",
      render: (text: string, record: ProjectAgentType | any) => (
        <>
          <EditOutlined
            type="link"
            onClick={() => handleEdit(record.id)}
            style={{ marginRight: "10%" }}
          />
          <Popconfirm
            title="Вы уверены, что хотите удалить агента?"
            onConfirm={() => handleDelete(record.id)}
            okText="Да"
            cancelText="Нет"
          >
            <DeleteOutlined type="link" />
          </Popconfirm>
        </>
      ),
    },
  ];
  useEffect(() => {
    projectAgentStore.fetchProjectAgent();
  }, []);

  // EXPORT XLS

  const exportFetchDocument = () => {
    ProjectAgentApi.exportProjectAgentDocument()
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
    return `Agents.xls`;
  };

  //

  return (
    <div>
      <StyledTopComponent>
        <StyledImportComponent>
          <h2> Импорт документа</h2>
          <Input onChange={handleFileSelect} type="file" />
          <Button onClick={handleFileUpload}>Загрузить</Button>
        </StyledImportComponent>

        <StyledImportComponent>
          <h2>Экспорт документа</h2>
          <Button onClick={() => exportFetchDocument()}>Загрузить</Button>{" "}
        </StyledImportComponent>
      </StyledTopComponent>

      <Button type="primary" onClick={() => setVisible(true)}>
        Создать агента
      </Button>

      <Table
        columns={updatedColumns}
        dataSource={projectAgentStore.ProjectAgent}
        loading={projectAgentStore.loading}
        rowKey="id"
        pagination={paginationConfig}
      />
      <CreateAgentModal isVisible={visible} setIsVisible={setVisible} />
      <Modal
        open={modalVisible}
        title="Изменить проектного агента"
        onCancel={handleCancelEdit}
        footer={[
          <Button key="cancel" onClick={handleCancelEdit}>
            Отмена
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => handleSave(editingId)}
          >
            Сохранить
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item name="full_name" label="ФИО" {...layoutProps}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Номер телефона" {...layoutProps}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" {...layoutProps}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

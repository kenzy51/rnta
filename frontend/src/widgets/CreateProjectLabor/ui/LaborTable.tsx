import { projectLaborStore } from "src/shared/store/projectLabors/service/projectLaborStore";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Popconfirm,
  Table,
  notification,
  Modal,
  Form,
  Tooltip,
} from "antd";
import { FindProject } from "src/shared/ui/FindProject";
import { FindEmployee } from "src/shared/ui/FindEmployee";
import { StyledTopComponent } from "src/widgets/ClientEntity/ui/ClientEntity";
import { StyledImportComponent } from "src/widgets/Projects/ui/Projects";
import { ProjectLaborApi } from "src/shared/store/projectLabors/api/projectLaborsApi";
import FileSaver from "file-saver";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const LaborTable = observer(() => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    projectLaborStore.fetchProjectLabor();
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      ProjectLaborApi.importProjectsLaborExcel(selectedFile);
    } else {
      notification.info({
        message: "Выберите файл",
      });
    }
  };

  const exportFetchDocument = () => {
    ProjectLaborApi.exportProjectLaborDocument()
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
    return `projectLabor.xls`;
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await projectLaborStore.deleteProjectLabor(id);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Время",
      render: (record) => {
        return (
          <>
            <p>{record.minutes} минут</p>
            <p>{record.hours} часов</p>
          </>
        );
      },
    },
    {
      title: "Проект",
      dataIndex: "project_name",
      key: "project_name",
    },
    {
      title: "Специалист",
      dataIndex: "employee_full_name",
      key: "employee_full_name",
    },  {
      title: "Услуга",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Комментарий",
      dataIndex: "comment",
      key: "comment",
      render: (comment) => {
        if (comment === null) {
          return "Отсутсвует";
        } else {
          return comment;
        }
      },
    },
    {
      title: "",
      key: "",
      render: (text, record) => (
        <div style={{display:'flex', justifyContent:'space-around'}}>
          <Tooltip title="Редактировать" placement="top">
            <EditOutlined
              type="link"
              onClick={() => handleEdit(record.id)}
            />
          </Tooltip>
          <Tooltip title="Удалить" placement="top">
            <Popconfirm
              title="Вы уверены, что хотите удалить трудозатрату?"
              onConfirm={() => handleDelete(record.id)}
              okText="Да"
              cancelText="Нет"
            >
              <DeleteOutlined type="link" />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  const SummaryUpdateModal = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const record = projectLaborStore.ProjectLabor.find(
      (p) => p.id === editingId
    );
    const handleSave = async () => {
      try {
        const values = await form.validateFields();
        values.project = selectedProject;
        values.employee = selectedEmployee;
        await projectLaborStore.updateProjectLabor(values, editingId);
        notification.success({
          message: "Трудозатрата изменена успешно, обновите страницу",
        });
        setModalVisible(false);
      } catch (error) {
        console.error(error);
        notification.error({
          message: "Произошла ошибка",
        });
      }
    };
    const handleCancel = () => {
      setModalVisible(false);
    };

    useEffect(() => {
      if (record) {
        form.setFieldsValue(record);
      }
    }, [record]);

    return (
      <Modal
        open={modalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Сохранить"
        cancelText="Отменить"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="hours"
            label="Часы"
            rules={[{ required: true, message: "Введите количество часов" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="minutes"
            label="Минуты"
            rules={[{ required: true, message: "Введите количество минут" }]}
          >
            <Input />
          </Form.Item>
          <FindProject setSelectedProjectId={setSelectedProject} />
          <FindEmployee setSelectedSpecialist={setSelectedEmployee} />
        </Form>
      </Modal>
    );
  };

  return (
    <div>
      <StyledTopComponent>
        <StyledImportComponent>
          <h2>Импорт документа</h2>
          <Input onChange={handleFileSelect} type="file" placeholder="" />
          <Button onClick={handleFileUpload}>Загрузить</Button>{" "}
        </StyledImportComponent>
        <StyledImportComponent>
          <h2>Экспорт документа</h2>
          <Button onClick={exportFetchDocument}>Загрузить</Button>{" "}
        </StyledImportComponent>
      </StyledTopComponent>
      <Table
        columns={columns}
        dataSource={projectLaborStore.ProjectLabor}
        rowKey="id"
        pagination={{
          pageSize: 50,
        }}
        loading={projectLaborStore.loading}
      />
      {modalVisible && <SummaryUpdateModal />}
    </div>
  );
});

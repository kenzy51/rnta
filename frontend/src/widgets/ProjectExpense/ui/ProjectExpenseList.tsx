import { useEffect, useState, Fragment } from "react";
import {
  Button,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  Tooltip,
  notification,
} from "antd";
import { observer } from "mobx-react-lite";
import { projectExpenseStore } from "src/shared/store/projectExpense/service/projectExpenseStore";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { columns } from "./tableItems";
import { ProjectExpensesFormFields } from "src/widgets/CreateProjectExpense/ui/ProjectExpensesFields";
import { FindProject } from "src/shared/ui/FindProject";
import moment from "moment";
import { ProjectExpenseApi } from "src/shared/store/projectExpense/api/projectExpenseApi";
import { StyledImportComponent } from "src/widgets/Projects/ui/Projects";
import { StyledTopComponent } from "src/widgets/ClientEntity/ui/ClientEntity";
import FileSaver from "file-saver";

export const ProjectExpenseList = observer(() => {
  const [editingId, setEditingId]: any = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    projectExpenseStore.fetchProjectExpenses();
  }, []);
  const { projectExpenses } = projectExpenseStore;

  const handleSave = async (id: number | string) => {
    try {
      const values = await form.validateFields();
      values.project = selectedProject;
      values.month_request = moment(values.month_request).format("YYYY-MM-DD");
      values.paid_date = moment(values.paid_date).format("YYYY-MM-DD");
      await projectExpenseStore.updateProjectExpense(values, id);
      setModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (id: number | string) => {
    setEditingId(id);
    const projectExpense = projectExpenseStore.projectExpenses.find(
      (item) => item.id === id
    );
    if (projectExpense) {
      form.setFieldsValue(projectExpense);
    }
    setModalVisible(true);
  };

  const isLoading = projectExpenseStore.loading;

  const handleDelete = async (id: number, projectName: string) => {
    await projectExpenseStore.deleteProjectExpense(id, projectName);
  };

  const updatedColumns = [
    ...columns,
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: (text: string, record: any) => (
        <div style={{ display: "flex" }}>
          <Tooltip title="Редактировать" placement="top">
            <EditOutlined onClick={() => handleEdit(record.id)} />
          </Tooltip>

          <Popconfirm
            title="Вы уверены что хотите удалить?"
            onConfirm={() => handleDelete(record.id, record.project_name)}
            okText="Да"
            cancelText="Нет"
          >
            <Tooltip title="Удалить" placement="top">
              <DeleteOutlined
                type="danger"
                style={{ marginLeft: "8px" }}
                title="delete"
              >
                Удалить
              </DeleteOutlined>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 50,
    hideOnSinglePage: true,
  };

  const props = {
    dataSource: projectExpenses,
    columns: updatedColumns,
    rowKey: "id",
    pagination: paginationConfig,
    loading: isLoading,
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleUpdateDataProjectExpense = () => {
    try {
      ProjectExpenseApi.updateDataProjectExpense();
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
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      ProjectExpenseApi.importProjectExpensesExcel(selectedFile);
    } else {
      notification.info({
        message: "Выберите файл",
      });
    }
  };
  //

  const exportFetchDocument = () => {
    ProjectExpenseApi.exportProjectExpenseDocument()
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
    return `projectsExpense.xls`;
  };
  //
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
          <Button onClick={() => exportFetchDocument()}>Загрузить</Button>{" "}
        </StyledImportComponent>
      </StyledTopComponent>
      <Button onClick={() => handleUpdateDataProjectExpense()}>
        Рассчитать
      </Button>
      <Table {...props} />
      <Modal
        open={modalVisible}
        title="Изменить затрату по проекту"
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
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
          {ProjectExpensesFormFields.map((field: any) => (
            <Fragment key={field.name}>{field.component}</Fragment>
          ))}
          <FindProject
            setSelectedProjectId={setSelectedProject}
            onChange={onChange}
          />
        </Form>
      </Modal>
    </div>
  );
});

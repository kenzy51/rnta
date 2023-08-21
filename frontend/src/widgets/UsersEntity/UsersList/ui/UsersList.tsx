import { useEffect, useState } from "react";
import {
  Table,
  Popconfirm,
  Form,
  Input,
  Modal,
  Button,
  notification,
  Select
} from "antd";
import { usersStore } from "src/shared/store/users/service/usersStore";
import { observer } from "mobx-react-lite";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { columns } from "./tableColumns";
import { UsersApi } from "src/shared/store/users/api/usersApi";
import { StyledImportComponent } from "src/widgets/Projects/ui/Projects";
import FileSaver from "file-saver";
import { StyledTopComponent } from "src/widgets/ClientEntity/ui/ClientEntity";
import { OptionType } from "../../CreateUser/ui/CreateUser";
import { UserType } from "src/shared/store/users/types";

export const UsersList = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues]: any = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const { users } = usersStore;
  useEffect(() => {
    usersStore.fetchUsers();
  }, []);

  const handleEdit = (record: UserType) => {
    setFormValues(record);
    setIsModalVisible(true);
  };
  const handleDelete = (id: string) => {
    usersStore.deleteUser(id);
  };
  const handleUpdate = (id: string, values: any) => {
    usersStore.updateUser(values, id);
    setIsModalVisible(false);
  };
  const addedColumns = [
    ...columns,
    {
      title: "Редактировать / Удалить",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <EditOutlined type="link" onClick={() => handleEdit(record)}>
            Edit
          </EditOutlined>
          <Popconfirm
            title=" Вы уверены что хотите удалить данного пользователя?"
            onConfirm={() => handleDelete(record.id)}
            okText="Да"
            cancelText="Нет"
          >
            <DeleteOutlined type="link">Delete</DeleteOutlined>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const isLoading = usersStore.loading;
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      UsersApi.importUsersExcel(selectedFile);
    }
    else {
      notification.info({
        message: "Выберите файл",
      });
    }
  };
  // EXPORT XLS
  const exportFetchDocument = () => {
    UsersApi.exportUsersDocument()
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
    return `clients.xls`;
  };

  //
  const roleOptions: Array<OptionType > = [
    { value: "OWNER", label: "Владелец" },
    { value: "ADMIN", label: "Админ" },
    { value: "MANAGER", label: "Менеджер" },
    { value: "SEO_SPECIALIST", label: "SEO-специалист" },
    { value: "CONTEXT_SPECIALIST", label: "Контекстный специалист" },
    { value: "TARGET_SPECIALIST", label: "Целевой специалист" },
  ];
  // 
  return (
    <>
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

      <Table
        dataSource={users}
        columns={addedColumns}
        rowKey="id"
        loading={isLoading}
      />
      <Modal
        title="Редактировать пользователя"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={(values) => handleUpdate(formValues.id, values)}
          initialValues={formValues}
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>{" "}
          <Form.Item label="Пароль" name="password">
            <Input />
          </Form.Item>
          <Form.Item label="Имя" name="first_name">
            <Input />
          </Form.Item>
          <Form.Item label="Фамилия" name="last_name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Специализация" rules={[{ required: true }]}>
        <Select>
          {roleOptions.map((option: OptionType) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
          <Form.Item label="Зарплата" name="salary">
            <Input />
          </Form.Item>
          <Form.Item label="Часовая ставка" name="hour_rate">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить 
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

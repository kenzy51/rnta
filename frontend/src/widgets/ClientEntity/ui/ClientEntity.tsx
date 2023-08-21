import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Form, Input, notification } from "antd";
import { observer } from "mobx-react-lite";
import { clientStore } from "src/shared/store/client/service/clientStore";
import { CreateClient } from "./CreateClient";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { columns } from "./tableItems";
import { ClientApi } from "src/shared/store/client/api/clientApi";
import FileSaver from "file-saver";
import { StyledImportComponent } from "src/widgets/Projects/ui/Projects";
import { styled } from "styled-components";
import { ClientType } from "src/shared/store/client/clientTypes";

export const ClientEntity = observer(() => {
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [editingClient, setEditingClient]: any = useState(null);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchClients = () => {
      try {
        clientStore.fetchClients();
      } catch (e) {
        console.error(e);
      }
    };
    fetchClients();
  }, []);
  //
  const isLoading = clientStore.loading;

  const deleteClient = async (clientId: string) => {
    try {
      await clientStore.deleteClient(clientId);
    } catch (error) { }
  };

  const showEditModal = (client: ClientType) => {
    setEditingClient(client);
    form.resetFields();
    form.setFieldsValue(client);
    setVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedClient = { ...editingClient, ...values };
      await clientStore.updateClient(updatedClient.id, updatedClient);
      setVisible(false);
    } catch (error) { }
  };

  const updatedColumns = [
    ...columns,
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (_: any, record: any) => (
        <span>
          <EditOutlined
            onClick={() => showEditModal(record)}
            style={{ marginRight: 8 }}
          />
          <DeleteOutlined onClick={() => deleteClient(record.id)} />
        </span>
      ),
    },
  ];
  const pageConfig = {
    pageSize: 50,
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
      if (selectedFile) { 
        ClientApi.importClientsExcel(selectedFile);
      }
      else {
        notification.info({
          message: "Выберите файл",
        });
      }
  };
  // EXPORT XLS
  const exportFetchDocument = () => {
    ClientApi.exportClientsDocument()
      .then((response) => {
        const filename = getFilenameFromResponseHeaders(response.headers);
        const blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel',
        })
        FileSaver.saveAs(blob, filename)
      })
      .catch((e) => {
        notification.error({
          message: 'Произошла ошибка'
        })
      })
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
      <Button
        onClick={() => setCreateVisible(true)}
        style={{
          background: "linear-gradient(to right, #F67D37, #FF007E)",
          color: "white",
        }}
      >
        Создать клиента
      </Button>
      <Table
        dataSource={clientStore.clients}
        columns={updatedColumns}
        rowKey="id"
        loading={isLoading}
        pagination={pageConfig}
      />
      <Modal
        open={visible}
        title="Редактировать клиента"
        okText="Сохранить"
        cancelText="Отмена"
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Отмена
          </Button>,
          <Button key="create" type="primary" onClick={handleEditSubmit}>
            Создать
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="legal_entity"
            label="Юридическое лицо"
            rules={[{ required: true, message: "Введите юридическое лицо" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="site"
            label="Веб-сайт"
            rules={[{ required: true, message: "Введите веб-сайт" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <CreateClient visible={createVisible} setVisible={setCreateVisible} />
    </div>
  );
});

export const StyledTopComponent = styled.div`
display: flex;
justify-content: space-between;
` 
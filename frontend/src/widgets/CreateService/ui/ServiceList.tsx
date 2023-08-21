import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Table, Button, Form, Input, Popconfirm, Modal, Tooltip } from "antd";
import { serviceStore } from "src/shared/store/service/service/serviceStore";
import { ServiceType } from "src/shared/store/service/types";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { layoutProps } from "src/shared/consts/uiConsts";
export const ServiceList: React.FC = observer(() => {
  const [form] = Form.useForm();
  const [editingId, setEditingId]: any = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = (id: number | string) => {
    setEditingId(id);
    const service = serviceStore.Service.find((item) => item.id === id);
    if (service) {
      form.setFieldsValue(service);
    }
    setModalVisible(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(false);
  };

  const handleSave = async (id: string | number) => {
    try {
      const values = await form.validateFields();
      await serviceStore.updateService(values, id);
      handleCancelEdit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await serviceStore.deleteService(id);
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
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
      render: (description) => {
        if (description === null) {
          return "Отсутсвует";
        } else {
          return description;
        }
      },
    },
    {
      title: "",
      key: "",
      render: (text: string, record: ServiceType | any) => {
        return (
          <>
            <Tooltip title="Редактировать" placement="top">
              <EditOutlined
                type="link"
                onClick={() => handleEdit(record.id)}
                style={{ marginRight: "6%" }}
              />
            </Tooltip>
            <Tooltip title="Удалить" placement="top">
              <Popconfirm
                title="Вы уверены что хотите удалить?"
                onConfirm={() => handleDelete(record.id)}
                okText="Да"
                cancelText="Нет"
              >
                <DeleteOutlined type="link" />
              </Popconfirm>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
      pagination={{pageSize:50}}
        columns={columns}
        dataSource={serviceStore.Service}
        rowKey="id"
        loading={serviceStore.loading}
      />
      <Modal
        open={modalVisible}
        title="Изменить услугу"
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
          <Form.Item name="name" label="Название" {...layoutProps}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Описание" {...layoutProps}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

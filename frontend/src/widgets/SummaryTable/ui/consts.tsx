import { Button, Form, Modal, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import {
  Amount,
  Comment,
  InvoiceNumber,
  LegalPerson,
  PaymentDate,
  PaymentPurpose,
} from "src/widgets/CreateSummary/ui/FormEntities";
import { paymentStore } from "src/shared/store/summary/service/summaryStore";
import { FindProject } from "src/shared/ui/FindProject";
import { PaymentType } from "src/shared/store/summary/summaryTypes";
export const pageConfig = {
  pageSize: 50,
};
export const Сolumns = (getProjectNameById, handleDelete, handleEdit) => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Номер счета",
      dataIndex: "invoice_number",
      key: "invoice_number",
    },

    {
      title: "Юр-лицо",
      dataIndex: "legal_person",
      key: "legal_person",
      render: (legal_person: string) => {
        let tagColor = "";
        let tagText = "";
        switch (legal_person) {
          case "RUNIT":
            tagColor = "blue";
            tagText = "ООО РУНИТА";
            break;
          case "RA_RUNIT":
            tagColor = "green";
            tagText = "ООО РА РУНИТА";
            break;
          default:
            tagColor = "default";
            tagText = "ИП Уварова";
        }
        return <Tag color={tagColor}>{tagText}</Tag>;
      },
    },
    {
      title: "Проект",
      dataIndex: "project",
      key: "project",
      render: (projectId: number) => <p>{getProjectNameById(projectId)}</p>,
    },
    {
      title: "Услуга",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
    }, {
      title: "Комментарий",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Дата выставления счета",
      dataIndex: "billing_date",
      key: "billing_date",
    },
    {
      title: "Дата платежа",
      dataIndex: "paid_date",
      key: "paid_date",
    },
    {
      title: "Удалить/Редактировать",
      dataIndex: "",
      key: "",
      render: (record: PaymentType) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Popconfirm
            title="Вы уверены что хотите удалить?"
            cancelText="Отмена"
            okText="Да"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </Popconfirm>
          <EditOutlined onClick={() => handleEdit(record.id)} />
        </div>
      ),
    },
  ];
};

export const SummaryUpdateModal = ({
  modalVisible,
  setModalVisible,
  editingId,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [selectedProject, setselectedProject] = useState(null)
  useEffect(() => {
    if (modalVisible && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [modalVisible, initialValues, form]);
  const handleSave = async (id: string | number) => {
    try {
      const values = await form.validateFields();
      values.project = selectedProject;
      await paymentStore.updatePayment(values, id);
      setModalVisible(false);

    } catch (error) {
      console.error(error);

    }
  };

  return (
    <Modal
      open={modalVisible}
      width={700}
      onCancel={() => setModalVisible(false)}
      title={`Изменить сводку (ID: ${editingId})`}
      footer={[
        <Button key="cancel" onClick={() => setModalVisible(false)}>
          Отмена
        </Button>,
        <Button key="save" type="primary" onClick={() => handleSave(editingId)}>
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form}>
        <InvoiceNumber />
        <LegalPerson />
        <PaymentPurpose />
        <Amount />
        <PaymentDate/>
        <Comment />
        <FindProject setSelectedProjectId={setselectedProject} />
      </Form>
    </Modal>
  );
};
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Form, Input, Button, Modal, notification } from "antd";
import { serviceStore } from "src/shared/store/service/service/serviceStore";
import { ServiceType } from "src/shared/store/service/types";
import { SubmitButton } from "src/widgets/CreateSummary/ui/FormEntities";
import { ServiceList } from "./ServiceList";
import { layoutProps } from "src/shared/consts/uiConsts";
import { ServiceApi } from "src/shared/store/service/api/serviceApi";
import { StyledImportComponent } from "src/widgets/Projects/ui/Projects";
import { StyledTopComponent } from "src/widgets/ClientEntity/ui/ClientEntity";
import FileSaver from "file-saver";

const nameRules = [{ required: true, message: "Введите название сервиса" }];
const descriptionRules = [
  { required: true, message: "Введите описание для сервиса" },
];

export const CreateService: React.FC = observer(() => {
  const [visible, setVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    serviceStore.fetchService();
  }, []);

  const onFinish = async (values: ServiceType) => {
    try {
      await serviceStore.createService(values);
      setVisible(false);
    } catch (error) {
      alert(error);
    }
  };

  const props = {
    onClick: () => {
      setVisible(true);
    },
  };

  const modalProps = {
    open: visible,
    footer: null,
    onCancel: () => {
      setVisible(false);
    },
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      ServiceApi.importServicesExcel(selectedFile);
    }
    else {
      notification.info({
        message: "Выберите файл",
      });
    }
  };
  //
  // EXPORT XLS
  const exportFetchDocument = () => {
    ServiceApi.exportApiDocument()
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
    return `services.xls`;
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
          <Button onClick={() => exportFetchDocument()}>Загрузить</Button>{" "}
        </StyledImportComponent>
      </StyledTopComponent>

      <Button {...props} type="primary">
        Создать услугу
      </Button>
      <ServiceList />
      <Modal {...modalProps}>
        <h2>Создать услугу</h2>
        <Form onFinish={onFinish}>
          <Form.Item
            label="Название"
            name="name"
            rules={nameRules}
            {...layoutProps}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Описание"
            name="description"
            rules={descriptionRules}
            {...layoutProps}
          >
            <Input.TextArea />
          </Form.Item>{" "}
          <Form.Item
            label="Родитель(необязательно)"
            name="parent"
            {...layoutProps}
          >
            <Input />
          </Form.Item>
          <SubmitButton>Создать услугу</SubmitButton>
        </Form>
      </Modal>
    </div>
  );
});

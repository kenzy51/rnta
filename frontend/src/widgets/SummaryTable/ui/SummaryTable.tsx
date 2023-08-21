import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { paymentStore } from "src/shared/store/summary/service/summaryStore";
import { Button, Input, Table, notification } from "antd";
import { projectStore } from "src/shared/store/project/service/projectStore";
import { Сolumns, pageConfig, SummaryUpdateModal } from "./consts";
import { PaymentApi } from "src/shared/store/summary/api/summaryApi";
import { StyledImportComponent } from "src/widgets/Projects/ui/Projects";
import FileSaver from "file-saver";
import { StyledTopComponent } from "src/widgets/ClientEntity/ui/ClientEntity";
export const SummaryTable = observer(() => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [initialValues, setInitialValues] = useState(null); 
  const handleEdit = (id) => {
    const payment :any = paymentStore.payments.find((payment) => payment.id === id);
    if (payment) {
      setInitialValues(payment); 
      setEditingId(id);
      setModalVisible(true);
    }
  };
  useEffect(() => {
    paymentStore.fetchPayments();
    projectStore.fetchProject();
  }, []);

  const getProjectNameById = (projectId) => {
    const project = projectStore.projects.find(
      (project) => project.id === projectId
    );
    return project ? project.name : "";
  };
  const handleDelete = (id) => {
    try {
      paymentStore.deletePayment(id);
    } catch (e) {
      notification.error({
        message: "error",
      });
    }
  };

  const props = {
    dataSource: paymentStore.payments,
    columns: Сolumns(getProjectNameById, handleDelete, handleEdit),
    pagination: pageConfig,
    rowKey: "id",
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      PaymentApi.importSummaryExcel(selectedFile);
    }
    else {
      notification.info({
        message: "Выберите файл",
      });
    }
  };
 


  const exportFetchDocument = () => {
    PaymentApi.exportSummaryDocument()
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
    return `summary.xls`;
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
      <Table {...props} loading={paymentStore.loading} />
      <SummaryUpdateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        editingId={editingId}
        initialValues={initialValues} 
     />
        
    </div>
  );
});
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  notification,
  Tabs,
} from "antd";
import { projectLaborStore } from "src/shared/store/projectLabors/service/projectLaborStore";
import { ProjectLaborType } from "src/shared/store/projectLabors/types";
import { FindProject } from "src/shared/ui/FindProject/FindProject";
import { FindEmployee } from "src/shared/ui/FindEmployee";
import { ProjectLaborApi } from "src/shared/store/projectLabors/api/projectLaborsApi";
import { LaborTable } from "./LaborTable";
import FileSaver from "file-saver";
import { useForm } from "antd/es/form/Form";
import { CreateProjectLaborNew } from "./CreateProjectLaborNew";
export const CreateProjectLabor: React.FC = observer(() => {
  const [selectedProject, setSelectedProject]: any = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  console.log(selectedProjectName)
  const [selectedSpecialist, setSelectedSpecialist]: any = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const onFinish = async (values: ProjectLaborType) => {
    try {
      values.project = selectedProject;
      values.employee = selectedSpecialist;
      await projectLaborStore.createProjectLabor(values);
    } catch (error) {
      alert(`error happened ${error}`);
    }
  };
  const [form] = useForm();

  const handleMinuteChange = (value: number | undefined) => {
    if (value !== undefined && value > 59) {
      return;
    }
  };

  const handleUpdateDataProjectLabor = () => {
    try {
      ProjectLaborApi.updateProjectLaborData();
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
      ProjectLaborApi.importProjectsLaborExcel(selectedFile);
    }
    else {
      notification.info({
        message: "Выберите файл",
      });
    }
  };

  // EXPORT XLS
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

  const Create = () => {
    return (
      <>
       
        <h2>Создать трудозатрату</h2>
        <FindProject
          setSelectedProjectId={setSelectedProject}
          setSelectedProjectName={setSelectedProjectName}
        />
        <FindEmployee setSelectedSpecialist={setSelectedSpecialist} />
      </>
    );
  };

  const tabItems: any = [
    {
      key: 1,
      label: "Создание трудозатраты",
      children: <CreateProjectLaborNew />,
    },
    {
      key: 2,
      label: "Трудозатрата",
      children: <LaborTable />,
    },
  ];
  return (
    <div>
      <Tabs items={tabItems} />
    </div>
  );
});

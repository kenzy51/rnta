import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { ProjectLaborApi } from "src/shared/store/projectLabors/api/projectLaborsApi";

interface IModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  projectId: any;
}

export const ProjectLaborModal = ({
  open,
  setOpen,
  projectId,
}: IModalProps) => {
  const [projectLabor, setProjectLabor]: any = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectLaborApi.getProjectLaborByProject(
          projectId
        );
        setProjectLabor(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    if (open) {
      fetchData();
    }
  }, [open, projectId]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Проект",
      dataIndex: "project_name",
      key: "project_name",
    },
    {
      title: "Время",
      dataIndex: "hours",
      key: "hours",
      render: (text, record) => {
        return (
          <>
            <h3>{record.hours} часов</h3>
            <h3>{record.minutes} минут</h3>
          </>
        );
      },
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Специалист",
      dataIndex: "employee_full_name",
      key: "employee_full_name",
    },
  ];
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={800}
    >
      <h1>Трудозатрата</h1>
      <Table
        dataSource={projectLabor.results}
        columns={columns}
        pagination={false}
        rowKey='id'
      />
    </Modal>
  );
};

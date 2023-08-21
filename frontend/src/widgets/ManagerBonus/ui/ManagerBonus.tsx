import React, { useState } from "react";
import { Button, Input } from "antd";
import { ManagerBonusApi } from "src/shared/store/managerBonuses/api/managerBonusApi";
import FileSaver from "file-saver";

export const ManagerBonus = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleClickExport = () => {
    ManagerBonusApi.exportManagerBonus(startDate, endDate)
      .then((response) => {
        const filename = getFilenameFromResponseHeaders(response.headers);
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel",
        });
        FileSaver.saveAs(blob, filename);
      })
      .catch((error) => {});
  };

  const getFilenameFromResponseHeaders = (headers) => {
    const contentDispositionHeader = headers["content-disposition"];
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDispositionHeader);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, "");
    }
    return `manager_bonus_${startDate}-${endDate}.xls`;
  };

  return (
    <div style={{ width: "40%" }}>
      <h2>Экспорт данных бонусов менеджера</h2>

      <h4>Введите дату начала</h4>
      <Input
        placeholder="Дата окончания(dd.mm.yyyy)"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <h4>Введите дату окончания</h4>
      <Input
        placeholder="Дата начала(dd.mm.yyyy)"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <Button onClick={handleClickExport}>Экспортировать данные</Button>
    </div>
  );
};

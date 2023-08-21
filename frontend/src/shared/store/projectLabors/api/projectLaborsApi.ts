import { api } from "src/shared/configs/axios/axiosConfig";
import { PROJECT_LABORS } from "src/shared/consts/endpoints";
import { ProjectLaborType } from "../types";
import { notification } from "antd";
import { notificationImportError } from "src/shared/consts/notificationImport";

export class ProjectLaborApi {
  static getProjectLabors() {
    return api.get(PROJECT_LABORS);
  }
  static getProjectLaborByProject(projectId) {
    return api.get(`${PROJECT_LABORS}?project=${projectId}`);
  }
  static exportProjectLaborDocument() {
    return api.get(`${PROJECT_LABORS}export/`, { responseType: "blob" });
  }
  

  static async importProjectsLaborExcel(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(`${PROJECT_LABORS}import_data/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notification.success({
        message: 'Документ успешно импортирован',
      });
      return response;
    } catch (e) {
      notificationImportError();
    }
  }

  static updateProjectLaborData() {
    return api.get(`${PROJECT_LABORS}update_data/`);
  }

  static getProjectLaborById(id: string) {
    return api.get(`${PROJECT_LABORS}${id}/`);
  }

  static createProjectLabor(payload: ProjectLaborType) {
    return api.post(PROJECT_LABORS, payload);
  }

  static deleteProjectLabor(id: string | number) {
    return api.delete(`${PROJECT_LABORS}${id}/`);
  }

  static updateProjectLabor(payload: ProjectLaborType, id: string) {
    return api.put(`${PROJECT_LABORS}${id}/`, payload);
  }
}

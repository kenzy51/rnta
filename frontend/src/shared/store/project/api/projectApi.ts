import { api } from "src/shared/configs/axios/axiosConfig";
import { PROJECT } from "src/shared/consts/endpoints";
import { ProjectType } from "../types";
import { notificationImportError } from "src/shared/consts/notificationImport";

export class ProjectApi {
  static getProjects() {
    return api.get(PROJECT);
  }

  static async importProjectsExcel(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(`${PROJECT}import_data/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // notification.success({
      //   message: 'Документ успешно импортирован',
      // });
      return response;
    } catch (e) {
      notificationImportError();
      throw e
    }
  }
  static exportProjectDocument() {
    return api.get(`${PROJECT}export/`, { responseType: "blob" });
  }
  
  
  static updateProjectData() {
    return api.get(`${PROJECT}update_data/`);
  }

  static getProjectById(id: string) {
    return api.get(`${PROJECT}${id}/`);
  }

  static createProject(payload: ProjectType) {
    return api.post(PROJECT, payload);
  }

  static deleteProject(id: string) {
    return api.delete(`${PROJECT}${id}/`);
  }

  static updateProject(payload: ProjectType, id: string) {
    return api.put(`${PROJECT}${id}/`, payload);
  }
}

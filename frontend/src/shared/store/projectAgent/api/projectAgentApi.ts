import { api } from "src/shared/configs/axios/axiosConfig";
import { PROJECT_AGENT } from "src/shared/consts/endpoints";
import { ProjectAgentType } from "../types";
import { notification } from "antd";
import { notificationImportError } from "src/shared/consts/notificationImport";

export class ProjectAgentApi {
    static getProjectAgents() {
        return api.get(PROJECT_AGENT);
    }

    static exportProjectAgentDocument() {
      return api.get(`${PROJECT_AGENT}export/`, { responseType: "blob" });
    }
  
    
    static async importAgentsExcel(file) {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await api.post(`${PROJECT_AGENT}import_data/`, formData, {
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
    static getProjectAgentById(id: string) {
        return api.get(`${PROJECT_AGENT}${id}/`);
    }

    static createProjectAgent(payload: ProjectAgentType) {
        return api.post(PROJECT_AGENT, payload);
    }

    static deleteProjectAgent(id: string) {
        return api.delete(`${PROJECT_AGENT}${id}/`);
    }

    static updateProjectAgent(payload: ProjectAgentType, id: string) {
        return api.put(`${PROJECT_AGENT}${id}/`, payload);
    }
}
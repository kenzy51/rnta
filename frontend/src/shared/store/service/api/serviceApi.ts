import { api } from "src/shared/configs/axios/axiosConfig";
import { SERVICE } from "src/shared/consts/endpoints";
import { ServiceType } from "../types";
import { notification } from "antd";
import { notificationImportError } from "src/shared/consts/notificationImport";

export class ServiceApi {
  static getServices() {
    return api.get(SERVICE);
  }
  static exportApiDocument() {
    return api.get(`${SERVICE}export/`, { responseType: "blob" });
  }
  
  static async importServicesExcel(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(`${SERVICE}import_data/`, formData, {
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
  static getServiceById(id: string | number) {
    return api.get(`${SERVICE}${id}/`);
  }

  static createService(payload: ServiceType) {
    return api.post(SERVICE, payload);
  }

  static deleteService(id: string | number) {
    return api.delete(`${SERVICE}${id}/`);
  }

  static updateService(payload: ServiceType, id: string | number) {
    return api.put(`${SERVICE}${id}/`, payload);
  }
}

import { api } from "src/shared/configs/axios/axiosConfig";
import { CLIENTS_API } from "src/shared/consts/endpoints";
import { ClientType } from "../clientTypes";
import { notification } from "antd";
import { notificationImportError } from "src/shared/consts/notificationImport";

export class ClientApi {
  static getClients() {
    return api.get(CLIENTS_API);
  }
  static getClientById(id: string) {
    return api.get(`${CLIENTS_API}${id}/`);
  }

  static exportClientsDocument() {
    return api.get(`${CLIENTS_API}export/`, { responseType: "blob" });
  }

  static async importClientsExcel(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(`${CLIENTS_API}import_data/`, formData, {
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

  static createClient(payload: ClientType) {
    return api.post(CLIENTS_API, payload);
  }

  static deleteClient(id: string) {
    return api.delete(`${CLIENTS_API}${id}/`);
  }

  static updateClient(payload: ClientType, id: string) {
    return api.put(`${CLIENTS_API}${id}/`, payload);
  }
}

import { api } from "src/shared/configs/axios/axiosConfig";
import { USERS } from "src/shared/consts/endpoints";
import { UserType } from "../types";
import { notification } from "antd";
import { notificationImportError } from "src/shared/consts/notificationImport";

export class UsersApi {
  static getUSERSs() {
    return api.get(USERS);
  }

  static exportUsersDocument() {
    return api.get(`${USERS}export/`, { responseType: "blob" });
  }
  

  static async importUsersExcel(file) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await api.post(`${USERS}import_data/`, formData, {
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

  static getUSERSById(id: string) {
    return api.get(`${USERS}${id}/`);
  }

  static createUSERS(payload: UserType) {
    return api.post(USERS, payload);
  }

  static deleteUSERS(id: string) {
    return api.delete(`${USERS}${id}/`);
  }

  static updateUSERS(payload: UserType, id: string) {
    return api.put(`${USERS}${id}/`, payload);
  }

  static getDataAboutMe(accessToken: any) {
    return api.get(`${USERS}me/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}

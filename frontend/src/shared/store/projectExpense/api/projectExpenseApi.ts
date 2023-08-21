import { api } from "src/shared/configs/axios/axiosConfig";
import { PROJECT_EXPENSES } from "src/shared/consts/endpoints";
import { ExpenseType } from "../types";
import { notification } from "antd";
import { notificationImportError } from "src/shared/consts/notificationImport";

export class ProjectExpenseApi {
  static getProjectExpense() {
    return api.get(PROJECT_EXPENSES);
  }

  static async importProjectExpensesExcel(file) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await api.post(`${PROJECT_EXPENSES}import_data/`, formData, {
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

  static exportProjectExpenseDocument() {
    return api.get(`${PROJECT_EXPENSES}export/`, { responseType: "blob" });
  }
  
  
  static updateDataProjectExpense() {
    return api.get(`${PROJECT_EXPENSES}update_data/`);
  }

  static getPaymentById(id: string) {
    return api.get(`${PROJECT_EXPENSES}${id}/`);
  }

  static createProjectExpense(payload: ExpenseType) {
    return api.post(PROJECT_EXPENSES, payload);
  }

  static deleteProjectExpense(id: string) {
    return api.delete(`${PROJECT_EXPENSES}${id}/`);
  }

  static updateProjectExpense(payload: ExpenseType, id: string) {
    return api.put(`${PROJECT_EXPENSES}${id}/`, payload);
  }
}

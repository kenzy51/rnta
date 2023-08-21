import { api } from "src/shared/configs/axios/axiosConfig";
import { PAYMENTS_CLIENT } from "src/shared/consts/endpoints";
import { PaymentType } from "../summaryTypes";
import { notification } from "antd";
import { notificationImportError } from "src/shared/consts/notificationImport";

export class PaymentApi {
  static getPayments() {
    return api.get(PAYMENTS_CLIENT);
  }

  static exportSummaryDocument() {
    return api.get(`${PAYMENTS_CLIENT}export/`, { responseType: "blob" });
  }
  
  static async importSummaryExcel(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(`${PAYMENTS_CLIENT}import_data/`, formData, {
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
  static getPaymentById(id: string | number) {
    return api.get(`${PAYMENTS_CLIENT}${id}/`);
  }

  static createPayment(payload: PaymentType) {
    return api.post(PAYMENTS_CLIENT, payload);
  }

  static deletePayment(id: string | number) {
    return api.delete(`${PAYMENTS_CLIENT}${id}/`);
  }

  static updatePayment(payload: PaymentType, id: string | number) {
    return api.put(`${PAYMENTS_CLIENT}${id}/`, payload);
  }
}

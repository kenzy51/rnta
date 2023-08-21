import { makeAutoObservable } from "mobx";
import { PaymentApi } from "../api/summaryApi";
import { PaymentType } from "../summaryTypes";
import { notification } from "antd";

class PaymentStore {
    payments: PaymentType[] = [];
    loading: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    async fetchPayments() {
        try {
            this.loading = true
            const response = await PaymentApi.getPayments();
            this.payments = response.data.results;
        } catch (error) {
            console.error(error, 'error happened')
        }
        finally{
            this.loading = false
        }
    }

    async getPaymentById(id: string) {
        try {
            const response = await PaymentApi.getPaymentById(id);
            return response.data;
        } catch (error) {
            console.error(error, 'errror happened')
        }
    }

    async createPayment(payload: PaymentType) {
        try {
            const response = await PaymentApi.createPayment(payload);
            if (response.status === 200) {
            }
            else {
                notification.success({
                    message: `Успешно`,
                    description: `Создана сводка`,
                });
            }
            this.payments.push(payload);
        } catch (error: any) {
            console.error(error, 'errror happened');
            if (error.status === 400) {
                notification.error({
                    message: ' Ошибка',
                    description: `Ошибка при создании сводки,проверьте на правильность поля`,
                })
            }
            else {
                notification.error({
                    message: ' Ошибка',
                    description: `Произошла ошибка при создании сводки`,
                })
            }
        }
    }

    async deletePayment(id: string) {
        try {
            await PaymentApi.deletePayment(id);
            this.payments = this.payments.filter((payment) => payment.id !== id);
            notification.success({
                message:'Успешно удалено'
            })
        } catch (error) {
            console.error(error, 'errror happened')
        }
    }

    async updatePayment(payload: PaymentType, id: number | string) {
        try {
            await PaymentApi.updatePayment(payload, id);
            const index = this.payments.findIndex((payment) => payment.id === id);
            if (index !== -1) {
                this.payments[index] = payload;
            }
            notification.success({
                message: "Редактирование прошло успешно,обновите страницу",
              });
        } catch (error) {
            console.error(error, 'errror happened')
            notification.error({
                message: "Произошла ошибка",
              });
        }
    }
}

export const paymentStore = new PaymentStore();

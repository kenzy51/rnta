import { makeAutoObservable } from "mobx";
import { ServiceApi } from "../api/serviceApi";
import { ServiceType } from "../types";
import { notification } from "antd";

class ServiceStore {
    Service: ServiceType[] = [];
    loading: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    async fetchService() {
        try {
            this.loading = true;
            const response = await ServiceApi.getServices();
            this.Service = response.data.results;
        } catch (error) {
        }
        finally {
            this.loading = false
        }
    }

    async getProjectExpenseById(id: string | number) {
        try {
            const response = await ServiceApi.getServiceById(id);
            return response.data;
        } catch (error) {
        }
    }

    async createService(payload: ServiceType) {
        try {
            const response = await ServiceApi.createService(payload);
            if (response.status === 200) {
            }
            else {
                notification.success({
                    message: `Успешно`,
                    description: `Услуга успешна создана,перезагрузите, чтобы получить`,
                });
            }
            this.Service.push(payload);
        } catch (error) {
            if (error) {
                notification.error({
                    message: ' Ошибка',
                    description: `Ошибка при создании услуги,проверьте на правильность поля`,
                })
            }
        }
    }

    async deleteService(id: string | number) {
        try {
            const response = await ServiceApi.deleteService(id);
            this.Service = this.Service.filter((expense) => expense.id !== id);
            if (response.status === 200) {
            }
            else {
                notification.success({
                    message: `Успешно`,
                    description: `Услуга успешна удалена`,
                });
            }
        } catch (error) {
            if (error) {
                notification.error({
                    message: ' Ошибка',
                    description: `Ошибка при удалении услуги,проверьте на правильность поля`,
                })
            }
        }
    }
  
    async updateService(payload: ServiceType, id: string | number) {
       
        try {
            await ServiceApi.updateService(payload, id);
            const index = this.Service.findIndex((expense) => expense.id === id);
            if (index !== -1) {
                this.Service[index] = payload;
            }
            const notificationSuccess = ()=>{
                return(
                 notification.success({
                     message: `Успешно`,
                     description: `Услуга успешно обновлена ,перезагрузите, чтобы получить`,
                 })
                )
             }
             notificationSuccess()
            
        } catch (error) {
            if (error) {
                notification.error({
                    message: ' Ошибка',
                    description: `Ошибка при изменении услуги,проверьте на правильность поля`,
                })
            }
        }
    }
}
export const serviceStore = new ServiceStore();
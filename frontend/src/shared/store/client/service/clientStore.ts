import { makeAutoObservable } from "mobx";
import { ClientApi } from "../api/clientApi";
import { ClientType } from "../clientTypes";
import { notification } from "antd";

class ClientStore {
  clients: ClientType[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchClients() {
    try {
      this.loading = true;
      const response = await ClientApi.getClients();
      this.clients = response.data.results;
    } catch (error) {
      console.error(error, "An error occurred while fetching clients");
    } finally {
      this.loading = false;
    }
  }

  async createClient(payload: ClientType) {
    try {
      this.loading = true;
      const response = await ClientApi.createClient(payload);
      this.clients.push(payload);
      if (response.status === 200) {
      } else {
        notification.success({
          message: `Успешно`,
          description: `Создан клиент,перезагрузите, чтобы получить`,
        });
      }
    } catch (error: any) {
      if (error.status === 400) {
        notification.error({
          message: ' Ошибка',
          description: `Ошибка при создании клиента,проверьте на правильность поля`,
        });
      } else {
        notification.error({
          message: ' Ошибка',
          description: `Произошла ошибка при создании клиента`,
        });
      }
    } finally {
      this.loading = false;
    }
  }

  async deleteClient(id: string) {
    try {
      this.loading = true;
      await ClientApi.deleteClient(id);
      this.clients = this.clients.filter(client => client.id !== id);
    } catch (error) {
      console.error(error, "An error occurred while deleting client");
    } finally {
      this.loading = false;
    }
  }

  async updateClient(id: string, payload: ClientType) {
    try {
      this.loading = true;
      await ClientApi.updateClient(payload, id);
      const index = this.clients.findIndex(client => client.id === id);
      if (index !== -1) {
        this.clients[index] = payload;
      }
      notification.success({
        message: `Успешно`,
        description: `перезагрузите пожалуйста, чтобы увидеть изменение`,
      });
    } catch (error) {
      console.error(error, "An error occurred while updating client");
    } finally {
      this.loading = false;
    }
  }
}

export const clientStore = new ClientStore();

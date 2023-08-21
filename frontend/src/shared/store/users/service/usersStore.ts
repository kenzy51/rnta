import { makeAutoObservable } from "mobx";
import { UsersApi } from "../api/usersApi";
import { UserType } from "../types";
import { notification } from "antd";

class UsersStore {
  users: UserType[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    try {
      this.loading = true;
      const response = await UsersApi.getUSERSs();
      this.users = response.data.results;
    } catch (error) {
      console.error(error, "An error occurred while fetching Userss");
    } finally {
      this.loading = false;
    }
  }
  
  async fetchUserById(userId) {
    try {
      this.loading = true;
      const response = await UsersApi.getUSERSById(userId);
      this.users = response.data.results;
    } catch (error) {
      console.error(error, "An error occurred while fetching Userss");
    } finally {
      this.loading = false;
    }
  }

  async createUser(payload: UserType) {
    try {
      this.loading = true; // Set loading to true before creating
      const response = await UsersApi.createUSERS(payload);
      this.users.push(payload);
      if (response.status === 200) {
        // Handle success
      } else {
        notification.success({
          message: `Успешно`,
          description: `Специалист успешно создан`,
        });
      }
    } catch (error) {
      console.error(error, "An error occurred while creating Users");
      if (error) {
        notification.error({
          message: " Ошибка",
          description: `Ошибка при создании специалиста, проверьте на правильность поля`,
        });
      }
    } finally {
      this.loading = false; // Set loading to false after creating
    }
  }

  async deleteUser(id: string) {
    try {
      this.loading = true; // Set loading to true before deleting
      await UsersApi.deleteUSERS(id);
      this.users = this.users.filter((user) => user.id !== id);
      notification.success({
        message: `Успешно`,
        description: `Специалист успешно удален`,
      });
    } catch (error) {
      console.error(error, "An error occurred while deleting Users");
      if (error) {
        notification.error({
          message: " Ошибка",
          description: `Произошла ошибка при удалении специалиста`,
        });
      }
    } finally {
      this.loading = false; // Set loading to false after deleting
    }
  }

  async updateUser(payload: UserType, id: string) {
    try {
      this.loading = true; // Set loading to true before updating
      await UsersApi.updateUSERS(payload, id);
      const index = this.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        this.users[index] = payload;
      }
    } catch (error) {
      console.error(error, "An error occurred while updating Users");
    } finally {
      this.loading = false; // Set loading to false after updating
    }
  }
}

export const usersStore = new UsersStore();

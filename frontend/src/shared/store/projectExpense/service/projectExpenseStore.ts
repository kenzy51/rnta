import { makeAutoObservable } from "mobx";
import { ProjectExpenseApi } from "../api/projectExpenseApi";
import { ExpenseType } from "../types";
import { notification } from "antd";

class ProjectExpenseStore {
    projectExpenses: ExpenseType[] = [];
    loading: boolean = false; 

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProjectExpenses() {
        try {
            this.loading = true; 
            const response = await ProjectExpenseApi.getProjectExpense();
            this.projectExpenses = response.data.results;
        } catch (error) {
            console.error(error, "An error occurred while fetching project expenses");
        } finally {
            this.loading = false;
        }
    }

    async createProjectExpense(payload: ExpenseType, projectName: string) {
        try {
            this.loading = true; 
            const response = await ProjectExpenseApi.createProjectExpense(payload);
            this.projectExpenses.push(payload);
            if (response.status === 200) {
            } else {
                notification.success({
                    message: `Успешно создано`,
                    description: `Создана затрата по ${projectName ? projectName : 'данному проекту'},перезагрузите пожалуйста`,
                });
            }
        } catch (error: any) {
            notification.error({
                message: ' Ошибка',
                description: `Ошибка создания затрат по ${projectName ? projectName : 'данному проекту'}`,
            });
            console.error(error, "An error occurred while creating project expense");
        } finally {
            this.loading = false; 
        }
    }

    async deleteProjectExpense(id: any, projectName:string) {
        try {
            this.loading = true; 
            await ProjectExpenseApi.deleteProjectExpense(id);
            this.projectExpenses = this.projectExpenses.filter((expense) => expense.id !== id);
            notification.success({
                message: `Успешно`,
                description: `Удалена затрата по ${projectName ? projectName : 'данному проекту'}`,
            });
        } catch (error) {
            console.error(error, "An error occurred while deleting project expense");
        } finally {
            this.loading = false; 
        }
    }

    async updateProjectExpense(payload: ExpenseType, id: any) {
        try {
            this.loading = true;  
            await ProjectExpenseApi.updateProjectExpense(payload, id);
            const index = this.projectExpenses.findIndex((expense) => expense.id === id);
            if (index !== -1) {
                this.projectExpenses[index] = payload;
            }
            notification.success({
                message: `Успешно`,
                description: `Редактирована затрата по данному проекту,перезагрузите пожалуйста`,
            });
        } catch (error) {
            console.error(error, "An error occurred while updating project expense");
        } finally {
            this.loading = false;
        }
    }
}

export const projectExpenseStore = new ProjectExpenseStore();

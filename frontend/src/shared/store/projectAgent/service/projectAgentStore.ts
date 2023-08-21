import { makeAutoObservable } from "mobx";
import { ProjectAgentApi } from "../api/projectAgentApi";
import { ProjectAgentType } from "../types";
import { notification } from "antd";

class ProjectAgentStore {
    ProjectAgent: ProjectAgentType[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProjectAgent() {
        try {
            this.loading = true;
            const response = await ProjectAgentApi.getProjectAgents();
            this.ProjectAgent = response.data.results;
        } catch (error) {
            console.error(error, "An error occurred while fetching project expenses");
        } finally {
            this.loading = false;
        }
    }

    async getProjectExpenseById(id: string) {
        try {
            const response = await ProjectAgentApi.getProjectAgentById(id);
            return response.data;
        } catch (error) {
            console.error(error, "An error occurred while fetching project expense by ID");
        }
    }

    async createProjectExpense(payload: ProjectAgentType) {
        try {
            const response = await ProjectAgentApi.createProjectAgent(payload);
            this.ProjectAgent.push(payload);
            if (response.status === 200) {
            }
            else {
                notification.success({
                    message: `Успешно`,
                    description: `Создан агент,перезагрузите пожалуйста`,
                });
            }
        } catch (error: any) {
            if (error.status === 400) {
                notification.error({
                    message: ' Ошибка',
                    description: `Ошибка при создании агента,проверьте на правильность поля`,
                })
            }
            else {
                notification.error({
                    message: ' Ошибка',
                    description: `Произошла ошибка при создании агента`,
                })
            }
        }
    }

    async deleteProjectExpense(id: string) {
        try {
            const response = await ProjectAgentApi.deleteProjectAgent(id);
            this.ProjectAgent = this.ProjectAgent.filter((expense) => expense.id !== id);
            if (response.status === 200) {
            }
            else {
                notification.success({
                    message: `Успешно`,
                    description: `Удален агент`,
                });
            }
        } catch (error: any) {
            console.error(error, "An error occurred while deleting project expense");
            if (error.status === 400) {
                notification.error({
                    message: ' Ошибка',
                    description: `Ошибка при удалении агента,проверьте на правильность поля`,
                })
            }
            else {
                notification.error({
                    message: ' Ошибка',
                    description: `Произошла ошибка при удалении агента`,
                })
            }
        }
    }

    async updateProjectExpense(payload: ProjectAgentType, id: string) {
        try {
            await ProjectAgentApi.updateProjectAgent(payload, id);
            const index = this.ProjectAgent.findIndex((expense) => expense.id === id);
            if (index !== -1) {
                this.ProjectAgent[index] = payload;
            }
            notification.success({
                message: `Успешно`,
                description: `Изменен агент,перезагрузите пожалуйста`,
            })
        } catch (error: any) {
            if (error.status === 400) {
                notification.error({
                    message: ' Ошибка',
                    description: `Ошибка при изменении агента,проверьте на правильность поля`,
                })
            }
            else {
                notification.error({
                    message: ' Ошибка',
                    description: `Произошла ошибка при изменении агента`,
                })
            }
        }
    }
}

export const projectAgentStore = new ProjectAgentStore();
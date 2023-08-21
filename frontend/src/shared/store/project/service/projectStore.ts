import { makeAutoObservable } from "mobx";
import { ProjectApi } from "../api/projectApi";
import { ProjectType } from "../types";
import { notification } from "antd";

class ProjectStore {
    projects: ProjectType[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProject() {
        try {
            this.loading = true;
            const response = await ProjectApi.getProjects();
            this.projects = response.data.results;
        } catch (error) {
            console.error(error, "An error occurred while fetching project expenses");
        } finally {
            this.loading = false;
        }
    }

    async createProjectExpense(payload: ProjectType) {
        try {
            this.loading = true;
            const response = await ProjectApi.createProject(payload);
            this.projects.push(payload);
            if (response.status === 200) {
                // Handle success
            } else {
                notification.success({
                    message: `Успешно создано`,
                    description: `Создан проект,перезагрузите пожалуйста`,
                });
            }
        } catch (error: any) {
            if (error.status === 400) {
                notification.error({
                    message: " Ошибка",
                    description: `Ошибка при создании проекта, проверьте на правильность поля`,
                });
            } else {
                notification.error({
                    message: " Ошибка",
                    description: `Ошибка при создании проекта`,
                });
            }
            console.error(error, "An error occurred while creating project expense");
        } finally {
            this.loading = false;
        }
    }

    async deleteProjectExpense(id: string) {
        try {
            this.loading = true;
            await ProjectApi.deleteProject(id);
            this.projects = this.projects.filter((expense) => expense.id !== id);
        } catch (error) {
            if (error === 400 && 500) {
                notification.error({
                    message: " Ошибка",
                    description: `Ошибка при удалении проекта`,
                });
            } else {
                notification.error({
                    message: " Ошибка",
                    description: `Возникла ошибка при удалении проекта`,
                });
            }
            console.error(error, "An error occurred while deleting project expense");
        } finally {
            this.loading = false;
        }
    }

    async updateProjectExpense(payload: ProjectType, id: string) {
        try {
            this.loading = true;
            await ProjectApi.updateProject(payload, id);
            const index = this.projects.findIndex((expense) => expense.id === id);
            if (index !== -1) {
                this.projects[index] = payload;
            }
            notification.success({
                message: `Успешно`,
                description: `Изменен проект,перезагрузите пожалуйста`,
              });
        } catch (error) {
            console.error(error, "An error occurred while updating project expense");
        } finally {
            this.loading = false;
        }
    }
}

export const projectStore = new ProjectStore();
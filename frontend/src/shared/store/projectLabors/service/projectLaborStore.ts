import { makeAutoObservable } from "mobx";
import { ProjectLaborApi } from "../api/projectLaborsApi";
import { ProjectLaborType } from "../types";
import { notification } from "antd";

class ProjectLaborStore {
    ProjectLabor: ProjectLaborType[] = [];
    loading:boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    async fetchProjectLabor() {
        try {
            const response = await ProjectLaborApi.getProjectLabors();
            this.ProjectLabor = response.data.results;
            this.loading = true
        } catch (error) {
            console.error(error, "An error occurred while fetching project labors");
        }
        finally{
            this.loading = false;
        }
    }  
     async fetchProjeectLaborByProject(projectId:any) {
        try {
            const response = await ProjectLaborApi.getProjectLaborByProject(projectId);
            this.ProjectLabor = response.data.results;
        } catch (error) {
            console.error(error, "An error occurred while fetching project labors");
        }
    }

    async getProjectLaborById(id: string) {
        try {
            const response = await ProjectLaborApi.getProjectLaborById(id);
            return response.data;
        } catch (error) {
            console.error(error, "An error occurred while fetching project labor by ID");
        }
    }

    async createProjectLabor(payload: ProjectLaborType) {
        try {
            const response = await ProjectLaborApi.createProjectLabor(payload);
            this.ProjectLabor.push(payload);
            if (response.status === 200) {
            }
            else {
                notification.success({
                    message: `Успешно`,
                    description: `Создана трудозатрата`,
                });
            }
        } catch (error: any) {
            if (error.status === 400) {
                notification.error({
                    message: ' Ошибка',
                    description: `Ошибка при создании трудозатраты,проверьте на правильность поля`,
                })
            }
            else {
                notification.error({
                    message: ' Ошибка',
                    description: `Произошла ошибка при создании трудозатраты`,
                })
            }
        }
    }

    async deleteProjectLabor(id: string | number) {
        try {
            await ProjectLaborApi.deleteProjectLabor(id);
            this.ProjectLabor = this.ProjectLabor.filter((labor) => labor.id !== id);
        } catch (error) {
            console.error(error, "An error occurred while deleting project labor");
        }
    }

    async updateProjectLabor(payload: ProjectLaborType, id: any | number) {
        try {
            await ProjectLaborApi.updateProjectLabor(payload, id);
            const index = this.ProjectLabor.findIndex((labor) => labor.id === id);
            if (index !== -1) {
                this.ProjectLabor[index] = payload;
            }
        } catch (error) {
            console.error(error, "An error occurred while updating project labor");
        }
    }
}

export const projectLaborStore = new ProjectLaborStore();
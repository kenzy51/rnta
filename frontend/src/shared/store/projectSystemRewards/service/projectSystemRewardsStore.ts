import { makeAutoObservable } from "mobx";
import { ProjectSystRewardsApi } from "../api/projectSystemRewardsApi";
import { ProjectSystemRewardsType } from "../types";
import { notification } from "antd";

class ProjectRewardsStore {
    ProjectRewardss: ProjectSystemRewardsType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProjectRewardss() {
        try {
            const response = await ProjectSystRewardsApi.getProjectSystRewards();
            this.ProjectRewardss = response.data.results;
        } catch (error) {
            console.error(error, "An error occurred while fetching project expenses");
        }
    }

    async getProjectRewardsById(id: string) {
        try {
            const response = await ProjectSystRewardsApi.getProjectSystRewardsById(id);
            return response.data;

        } catch (error) {
            console.error(error, "An error occurred while fetching project expense by ID");
        }
    }

    async createProjectRewards(payload: ProjectSystemRewardsType) {
        try {
            const response = await ProjectSystRewardsApi.createProjectSystRewards(payload);
            this.ProjectRewardss.push(payload);
            if (response.status === 200) {
            }
            else {
                notification.success({
                    message: `Успешно`,
                    description: `Создано проектное вознаграждение`,
                });
            }
        } catch (error: any) {
            if (error.status === 400) {
                notification.error({
                    message: ' Ошибка',
                    description: `Ошибка при создании проектного вознаграждения,проверьте на правильность поля`,
                })
            }
            else {
                notification.error({
                    message: ' Ошибка',
                    description: `Произошла ошибка при создании проектного вознаграждения`,
                })
            }
        }
    }

    async deleteProjectRewards(id: string) {
        try {
            await ProjectSystRewardsApi.deleteProjectSystRewards(id);
            this.ProjectRewardss = this.ProjectRewardss.filter((expense) => expense.id !== id);
        } catch (error) {
            console.error(error, "An error occurred while deleting project expense");
        }
    }

    async updateProjectRewards(payload: ProjectSystemRewardsType, id: string) {
        try {
            await ProjectSystRewardsApi.updateProjectSystRewards(payload, id);
            const index = this.ProjectRewardss.findIndex((expense) => expense.id === id);
            if (index !== -1) {
                this.ProjectRewardss[index] = payload;
            }
        } catch (error) {
            console.error(error, "An error occurred while updating project expense");
        }
    }
}

export const projectRewardsStore = new ProjectRewardsStore();
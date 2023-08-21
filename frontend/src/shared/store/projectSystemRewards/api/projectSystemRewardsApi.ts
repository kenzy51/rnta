import { api } from "src/shared/configs/axios/axiosConfig";
import { PROJECT_SYSTEM_REWARDS } from "src/shared/consts/endpoints";
import { ProjectSystemRewardsType } from "../types";

export class ProjectSystRewardsApi {
    static getProjectSystRewards() {
        return api.get(PROJECT_SYSTEM_REWARDS);
    }

    static getProjectSystRewardsById(id: string) {
        return api.get(`${PROJECT_SYSTEM_REWARDS}${id}/`);
    }

    static createProjectSystRewards(payload: ProjectSystemRewardsType) {
        return api.post(PROJECT_SYSTEM_REWARDS, payload);
    }

    static deleteProjectSystRewards(id: string) {
        return api.delete(`${PROJECT_SYSTEM_REWARDS}${id}/`);
    }

    static updateProjectSystRewards(payload: ProjectSystemRewardsType, id: string) {
        return api.put(`${PROJECT_SYSTEM_REWARDS}${id}/`, payload);
    }
}
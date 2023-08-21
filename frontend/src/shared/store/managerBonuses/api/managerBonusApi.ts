import { api } from "src/shared/configs/axios/axiosConfig";
import { MANAGER_BONUSES } from "src/shared/consts/endpoints";

export class ManagerBonusApi {
  static getProjectExpense() {
    return api.get(MANAGER_BONUSES);
  }

  static exportManagerBonus(endDate, startDate) {
    return api.get(
      `${MANAGER_BONUSES}export/?start_date=${startDate}&end_date=${endDate}`,
      {
        responseType:'blob'
      }
    );
  }
}

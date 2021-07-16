import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callDashboardApi = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.DASHBOARD.GET}`, {
    
    });
  };
};



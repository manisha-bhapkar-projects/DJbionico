import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callUserListAPI = (page = 1, limit, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.USER.GET}`, {
      params: {
        page: page,
        limit: limit,
        search: search,
      },
    });
  };
};

export const callUserStatusChangeAPI = (id) => {
  console.log('id', id);
  
  return (_dispatch, _getState) => {
    return fetchClient.put(`${constants.API.USER.STATUS_CHANGE}${id}`,);
  };
};




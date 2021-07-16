import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callNotificationListAPI = (page = 1, limit=500, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.NOTIFICATION.GET}`, {
      params: {
        page: page,
        limit: limit,
        search: search,
      },
    });
  };
};


export const callAddNotificationApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.NOTIFICATION.POST}`, 
     data
    );
  };
};




export const callDeleteNotificationApi = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.delete(`${constants.API.NOTIFICATION.DELETE}${id}`,);
  };
};



// export const callEditMusicApi = (id, data) => {
//   return (_dispatch, _getState) => {
//     return fetchClient.put(`${constants.API.MUSIC.EDIT}${id}`, 
//     data,
//     );
//   };
// };
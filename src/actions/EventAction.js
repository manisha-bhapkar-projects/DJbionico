import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callEventListAPI = (page = 1, limit = 10, search = '') => {
  
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.EVENT_LIST.GET}`, {
      params: {
        page: page,
        limit: limit,
        search: search,
      },
    });
  };
};

export const callUploadImage = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(
      `${constants.API.UPLOAD.UPLOAD_IMAGE}`, data
    )
  };
};


export const callDeleteEventApi = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.delete(`${constants.API.EVENT_LIST.DELETE}${id}`,);
  };
};

// export const callEventDetailsAPI = (id) => {
//   return (_dispatch, _getState) => {
//     return fetchClient.get(`${constants.API.GENERIC_LIST.DETAILS}${id}`, {
     
//     });
//   };
// };

export const callEventDetailsAPI = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.EVENT_LIST.DETAILS}`, {
      params:{
        id
      }
    });
  };
};



export const callAddEventApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.EVENT_LIST.POST}`, 
     data
    );
  };
};

export const callEditEventApi = (id, data) => {
  return (_dispatch, _getState) => {
    return fetchClient.put(`${constants.API.EVENT_LIST.EDIT}${id}`, 
    data,
    );
  };
};



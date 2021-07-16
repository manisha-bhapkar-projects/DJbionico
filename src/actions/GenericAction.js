import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callGenericListAPI = (page = 1, limit=50, search = "" ) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.GENERIC_LIST.GET}`, {
      params: {
        page: page,
        limit: limit,
        search: search,
        // genric_type: genric_type
      },
    });
  };
};



// export const callAddGenericApi = (data) => {
//   return (_dispatch, _getState) => {
//     return fetchClient.post(`${constants.API.GENERIC_LIST.POST}`, data);
//   };
// };


export const callAddGenericApi = (data) => {
  console.log("add generic data",data);
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.GENERIC_LIST.POST}`, 
     data
    );
  };
};


export const callEditGenericApi = (id, data) => {
  console.log('id and data', id, data);
  return (_dispatch, _getState) => {
    return fetchClient.put(`${constants.API.GENERIC_LIST.EDIT}${id}`, 
    data,
    );
  };
};

export const callDeleteGenericApi = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.delete(`${constants.API.GENERIC_LIST.DELETE}${id}`,);
  };
};


export const callGenericDetailsAPI = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.GENERIC_LIST.DETAILS}`, 
    {
      params:{
           id
      },
    });
  };
};


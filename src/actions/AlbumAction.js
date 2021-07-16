import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callAddAlbumListAPI = (page = 1, limit=10, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.ALBUM.GET}`, {
      params: {
        page: page,
        limit: limit,
        search: search,
      },
    });
  };
};


export const callAddAlbumApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.ALBUM.POST}`, 
     data
    );
  };
};
export const callEditAlbumApi = (id, data) => {
  return (_dispatch, _getState) => {
    return fetchClient.put(`${constants.API.ALBUM.EDIT}${id}`, 
     data
    );
  };
};
export const callDeleteAlbumApi = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.delete(`${constants.API.ALBUM.DELETE}${id}`,);
  };
};

export const callAlbumDetailsAPI = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.ALBUM.DETAILS}`, {
      params:{
        id
      }
    });
  };
};


import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callMusicListAPI = (page = 1, limit=10, search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.MUSIC.GET}`, {
      params: {
        page: page,
        limit: limit,
        search: search,
      },
    });
  };
};


export const callAddMusicApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.MUSIC.POST}`, 
     data
    );
  };
};


export const callUploadSong = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(
      `${constants.API.UPLOAD.UPLOAD_SONG}`, data
      
    )
  };
};


export const callDeleteSongApi = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.delete(`${constants.API.MUSIC.DELETE}${id}`,);
  };
};

export const callMusicDetailsAPI = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.MUSIC.DETAILS}${id}`, {
      // params:{
      //   id
      // }
    });
  };
};

export const callEditMusicApi = (id, data) => {
  return (_dispatch, _getState) => {
    return fetchClient.put(`${constants.API.MUSIC.EDIT}${id}`, 
    data,
    );
  };
};

export const callDJMusicApi = (radio) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.DJ.GET}`,
    {
      params: {
        genric_type: radio == '1' ? '1' : undefined
      },
    });
  };
};
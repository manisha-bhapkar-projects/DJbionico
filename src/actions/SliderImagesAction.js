import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callSliderImagesListAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.SLIDER_IMAGES.GET}`, {
     
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


export const callDeleteSliderImageApi = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.delete(`${constants.API.SLIDER_IMAGES.DELETE}${id}`,);
  };
};

// export const callEventDetailsAPI = (id) => {
//   return (_dispatch, _getState) => {
//     return fetchClient.get(`${constants.API.GENERIC_LIST.DETAILS}${id}`, {
     
//     });
//   };
// };





export const callAddSliderImageApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SLIDER_IMAGES.POST}`, 
     data
    );
  };
};






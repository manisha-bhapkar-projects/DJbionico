import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";



export const callUploadImage = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(
      `${constants.API.UPLOAD.UPLOAD_IMAGE}`, data
    )
  };
};







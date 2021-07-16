import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";
import { getRefreshToken }  from '../utils/storage'

export const callLoginApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.LOGIN.SIGNUP}`, data);
  };
};

export const callForgotPasswordApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.LOGIN.FORGOTPASSWORD_EMAIL}`, data,
     
    );
  };
};


export const callChangePasswordApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.LOGIN.CHANGE_PASSWORD}`, 
     data
    );
  };
};

export const callLogoutApi = () => {
  return (_dispatch, _getState) => {
      return fetchClient.post(
          `${constants.API.LOGIN.LOGOUT}`,
          {
              refresh_token : getRefreshToken()
          }
      );
  };
};
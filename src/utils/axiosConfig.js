import axios from "axios";
import constants from "./constants";
import history from "./history";
import { getAuthToken, storeAuthToken } from "./storage";
const fetchClient = () => {
  const defaultOptions = {
    // baseURL: `${constants.API.BASEURL.URL}`,
    baseURL:'https://djbionicomix.com/api/v1/'
  };
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // instance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error.response && error.response.status === 401) {
  //       storeAuthToken(null);
  //       history.push(constants.ROUTE.LOGIN.LOGIN);
  //       return Promise.reject(error);
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
};

export default fetchClient();
























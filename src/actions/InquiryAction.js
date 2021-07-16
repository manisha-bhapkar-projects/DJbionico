import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callInquiryListAPI = (page = 1, limit=10, search = "") => {
  console.log("inquiry Pageno, limt, search",page, limit, search);

  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.INQUIRY_LIST.GET}`, {
      params: {
        page: page,
        limit: limit,
        search: search,
      },
    });
  };
};






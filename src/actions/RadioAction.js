import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


export const callGetRadioAPI = () => {
    return(_dispatch, _getState) => {
        return fetchClient.get(`${constants.API.RADIO.GET}`,
        );
    };
};

export const callUpdateRadioAPI = (id, data) => {
    console.log('radio', id, data);
    
    return(_dispatch, _getState) =>{
        return fetchClient.put(`${constants.API.RADIO.UPDATE}${id}`,
        data,
        );
    };

};












// export const callEditEventApi = (id, data) => {
//   return (_dispatch, _getState) => {
//     return fetchClient.put(`${constants.API.EVENT_LIST.EDIT}${id}`, 
//     data,
//     );
//   };
// };



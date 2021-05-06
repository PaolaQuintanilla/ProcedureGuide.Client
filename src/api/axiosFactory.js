import axios from 'axios';

/**
 * Gets the custom events of an external site.
 * @param {String} url required: The url of the endpoint where we will retrieve the custom events.
 */
const AxiosFactory = (api) =>  {

  const axiosInstance = axios.create({
    baseURL: "http://192.168.0.141:5000/"+api,
  });

  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {  
      return Promise.reject(error);
    }
  );

  return axiosInstance;

};

export default AxiosFactory;
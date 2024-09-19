import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized: Access is denied.');
          break;
        case 403:
          console.error('Forbidden: Access is denied.');
          break;
        case 404:
          console.error('Not Found: The requested resource was not found.');
          break;
        default:
          console.error(
            `Error ${error.response.status}: ${error.response.data}`
          );
          break;
      }
    } else {
      console.error('Network error: No response from server.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

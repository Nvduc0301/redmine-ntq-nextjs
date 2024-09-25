import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const createAxiosInstance = (
  timeout: number,
  contentType: string
): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: {
      'Content-Type': contentType,
    },
  });

  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
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
      } else if (error.code === 'ECONNABORTED') {
        console.error('Request timed out.');
      } else {
        console.error('Network error: No response from server.');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create instance for  config
export const axiosInstance = createAxiosInstance(1000, 'application/json');
export const axiosPost = createAxiosInstance(10000, 'application/json');
export const uploadFile = createAxiosInstance(5000, 'application/octet-stream');

import axios from 'axios';

export const httpRequestInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const createRequest = ({config = () => ({}), withAuth = false}) => {
  const reqConfig = config();
  reqConfig.headers = {
    ['Content-Type']: 'application/json'
  };
  if (withAuth) {
    reqConfig.headers.Authorization = process.env.REACT_APP_API_KEY
  }
  return httpRequestInstance.request(reqConfig);
}
import { store } from '@redux';
import { showMessageErrorRoot } from '@slices';
import {useAuthInfo} from '@utils';
import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL = Config.DOMAIN + '/api';

export const axiosClient = axios.create({
  timeout: 60000,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config => {
    const {token} = useAuthInfo();
    config.headers.set('Authorization', `Bearer ${token}`);
    console.log('request', config);
    return config;
  },
  error => {
    const message = error.response.data?.message;
    const status = error.response.status;
    const response = status === 401 ? status : message;
    return Promise.reject(response);
  },
);

axiosClient.interceptors.response.use(
  response => {
    console.log('response', response);
    return response;
  },
  error => {
    const message = error.response.data?.message;
    const status = error.response.status;
    const response = status === 401 ? status : message;
    return Promise.reject(response);
  },
);

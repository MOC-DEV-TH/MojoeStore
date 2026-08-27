// import { store } from '@redux';
// import { showMessageErrorRoot } from '@slices';
// import {useAuthInfo} from '@utils';
// import axios from 'axios';
// import Config from 'react-native-config';

// const BASE_URL = Config.DOMAIN + '/api';

// export const axiosClient = axios.create({
//   timeout: 60000,
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosClient.interceptors.request.use(
//   config => {
//     const {token} = useAuthInfo();
//     config.headers.set('Authorization', `Bearer ${token}`);
//     console.log('request', config);
//     return config;
//   },
//   error => {
//     const message = error.response.data?.message;
//     const status = error.response.status;
//     const response = status === 401 ? status : message;
//     return Promise.reject(response);
//   },
// );

// axiosClient.interceptors.response.use(
//   response => {
//     console.log('response', response);
//     return response;
//   },
//   error => {
//     const message = error.response.data?.message;
//     const status = error.response.status;
//     const response = status === 401 ? status : message;
//     return Promise.reject(response);
//   },
// );

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

    if (token) {
      config.headers.set(
        'Authorization',
        `Bearer ${token}`,
      );
    }

    console.log('========== API REQUEST ==========');
    console.log('URL =>', config.url);
    console.log('METHOD =>', config.method);
    console.log('DATA =>', config.data);
    console.log('=================================');

    return config;
  },
  error => {
    console.log(
      'REQUEST ERROR =>',
      error,
    );

    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => {
    console.log('========== API RESPONSE ==========');
    console.log(
      'URL =>',
      response?.config?.url,
    );
    console.log(
      'STATUS =>',
      response?.status,
    );
    console.log(
      'DATA =>',
      response?.data,
    );
    console.log(
      '==================================',
    );

    return response;
  },

  error => {
    console.log('========== API ERROR ==========');

    console.log(
      'URL =>',
      error?.config?.url,
    );

    console.log(
      'METHOD =>',
      error?.config?.method,
    );

    console.log(
      'STATUS =>',
      error?.response?.status,
    );

    console.log(
      'DATA =>',
      error?.response?.data,
    );

    console.log(
      'MESSAGE =>',
      error?.message,
    );

    console.log(
      'REQUEST DATA =>',
      error?.config?.data,
    );

    console.log(
      '================================',
    );

    /*
     * Keep the original Axios error.
     *
     * Do NOT convert it to only the
     * backend message here.
     *
     * This allows the caller to access:
     *
     * error.response.status
     * error.response.data
     * error.response.data.message
     */
    return Promise.reject(error);
  },
);
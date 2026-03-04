import {axiosClient} from './axiosClient';

const axiosRequest = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  data?: any,
  params?: any,
  config?: any,
  callback?: any,
) => {
  const {shouldShowError = true, ...rest} = config || {};
  const requestConfig: any = {
    url,
    method,
    data,
    params,
    ...rest,
  };

  try {
    const response: any = await axiosClient.request(requestConfig);

    if (callback) {
      callback.onSuccess?.(response.data);
      return Promise.resolve(null);
    }

    return Promise.resolve(response.data);
  } catch (err) {
    if (callback) {
      callback.onError?.(err);
      return Promise.resolve(null);
    }

    return Promise.reject(err);
  }
};

export const get = async (
  url: string,
  params?: any,
  config?: any,
  callback?: any,
) => axiosRequest(url, 'GET', undefined, params, config, callback);

export const post = async (
  url: string,
  data?: any,
  config?: any,
  callback?: any,
) => axiosRequest(url, 'POST', data, undefined, config, callback);

export const deleteMethod = async (
  url: string,
  data?: any,
  config?: any,
  callback?: any,
) => axiosRequest(url, 'DELETE', data, undefined, config, callback);

export const postWithParams = async (
  url: string,
  data?: any,
  params?: any,
  config?: any,
  callback?: any,
) => axiosRequest(url, 'POST', data, params, config, callback);

export const put = async (
  url: string,
  data?: any,
  config?: any,
  callback?: any,
) => axiosRequest(url, 'PUT', data, undefined, config, callback);

export const putWithParams = async (
  url: string,
  data?: any,
  params?: any,
  config?: any,
  callback?: any,
) => axiosRequest(url, 'PUT', data, params, config, callback);

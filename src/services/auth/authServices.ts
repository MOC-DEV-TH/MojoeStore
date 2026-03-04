import {apiService, endpoints} from '@services';
import { getUserInfo } from '@slices';
import { getShopId } from '@utils';

export const requestLogin = async (data: any = {}) => {
  return apiService.post(endpoints.auth.login, data);
};

export const requestLogout = () => {
  return apiService.post(endpoints.auth.logout)
}

export const requestUpdateProfileApi = (data: any = {}) => {
  return apiService.post(endpoints.auth.updateProfile, data)
}

export const requestProfileApi = (data: any = {}) => {
  return apiService.get(endpoints.auth.profile);
}
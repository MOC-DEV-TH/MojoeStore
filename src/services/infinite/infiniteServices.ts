import {apiService} from '@services';

export const requestDynamicInfiniteApi = (
  url: string,
  params: any = {},
  config: any = {},
) => {
  return apiService.get(url, params, config);
};

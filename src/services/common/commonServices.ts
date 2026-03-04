import {apiService, endpoints} from '@services';

export const requestCategoryApi = () => {
  return apiService.get(endpoints.common.getParentCategory);
};

export const requestCreateCategoryApi = (body: any) => {
  return apiService.post(endpoints.common.createCategory, body);
};

export const requestCreateSubCategoryApi = (body: any) => {
  return apiService.post(endpoints.common.createSubCategory, body);
};

export const requestProductByCategoryApi = (id: number) => {
  return apiService.get(endpoints.common.getProductByCategory(id));
};

export const requestChartDataByIdApi = (id: number) => {
  return apiService.post(endpoints.common.getChartDataById(id));
};

export const requestCreateProductApi = (body: any) => {
  return apiService.post(endpoints.common.createProduct, body);
};

export const requestUpdateProductApi = (id: number, params: any) => {
  console.log('params', params);
  return apiService.putWithParams(
    endpoints.common.updateProduct(id),
    {},
    params,
  );
};

export const requestBarcodeApi = (body: any) => {
  return apiService.post(endpoints.common.searchBarcode, body);
};

export const requestCheckoutApi = (body: any) => {
  return apiService.post(endpoints.common.checkout, body);
};

export const requestSuspendApi = (body: any) => {
  return apiService.post(endpoints.common.suspend, body);
};

export const requestDeleteSuspendApi = (orderId: any) => {
  return apiService.delete(endpoints.common.deleteSuspend(orderId));
};

export const requestGetCategoryIconApi = () => {
  return apiService.get(endpoints.common.getParentCategoryIcon);
};

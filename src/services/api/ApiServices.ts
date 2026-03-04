import {deleteMethod, get, post, postWithParams, put, putWithParams} from './ApiHelper';

class ApiService {
  private static instance: ApiService;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public get = get;
  public post = post;
  public put = put;
  public delete = deleteMethod;
  public postWithParams = postWithParams;
  public putWithParams = putWithParams;
}

export const apiService = ApiService.getInstance();

import axios, { type AxiosResponse } from 'axios';

import errorHandlerInterceptor from '@/services/requests/interceptor';

export type IRequestHeaders = Record<string, string>;

export const DEFAULT_HEADERS: IRequestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const FORM_DATA_HEADERS: IRequestHeaders = {
  'Content-Type': 'multipart/form-data',
};

axios.interceptors.response.use(null, errorHandlerInterceptor);

class BaseRequest {
  static headers(headers?: IRequestHeaders): {
    headers?: IRequestHeaders;
  } {
    return { headers: headers || DEFAULT_HEADERS };
  }

  static get<TResponse>(url: string, fileDownload = false): Promise<AxiosResponse<TResponse>> {
    const headers = fileDownload ? { Accept: 'application/octet-stream' } : DEFAULT_HEADERS;

    return axios.get<TResponse>(url, this.headers(headers));
  }

  static post<TData, TResponse = TData>(
    url: string,
    data: TData,
    isMultiPart = false
  ): Promise<AxiosResponse<TResponse>> {
    if (isMultiPart) {
      return axios.post<TResponse>(url, data, this.headers(FORM_DATA_HEADERS));
    }

    return axios.post<TResponse>(url, data, this.headers());
  }

  static put<TData, TResponse = TData>(
    url: string,
    data: TData,
    isMultiPart = false
  ): Promise<AxiosResponse<TResponse>> {
    if (isMultiPart) {
      return axios.put<TResponse>(url, data, this.headers(FORM_DATA_HEADERS));
    }

    return axios.put<TResponse>(url, data, this.headers());
  }

  static patch<TData, TResponse = TData>(
    url: string,
    data: TData,
    isMultiPart = false
  ): Promise<AxiosResponse<TResponse>> {
    if (isMultiPart) {
      return axios.patch<TResponse>(url, data, this.headers(FORM_DATA_HEADERS));
    }

    return axios.patch<TResponse>(url, data, this.headers());
  }

  static delete<TResponse>(url: string): Promise<AxiosResponse<TResponse>> {
    return axios.delete<TResponse>(url, this.headers());
  }
}

export default BaseRequest;

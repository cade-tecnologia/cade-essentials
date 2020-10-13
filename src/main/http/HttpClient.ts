import Axios from 'axios-observable';
import { AxiosRequestConfig } from 'axios';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';

import HttpClientConfiguration from '../types/HttpClientConfiguration';

export default class HttpClient {
  private static instance: HttpClient;

  private axiosInstance: Axios;

  private constructor(props?: HttpClientConfiguration) {
    this.axiosInstance = Axios.create({
      responseType: props?.responseType ?? 'json',
    });

    this.buildRequestInterceptor(props);
    this.buildResponseInterceptor(props);
  }

  public static getInstance(props?: HttpClientConfiguration): HttpClient {
    if (!this.instance) {
      HttpClient.instance = new HttpClient(props);
    }

    return HttpClient.instance;
  }

  public get<T>(url: string, config?: AxiosRequestConfig): AxiosObservable<T> {
    return this.axiosInstance.get<T>(url, config);
  }

  public head<T>(url: string, config?: AxiosRequestConfig): AxiosObservable<T> {
    return this.axiosInstance.head(url, config);
  }

  public post<T>(url: string, body?: any, config?: AxiosRequestConfig): AxiosObservable<T> {
    return this.axiosInstance.post(url, body, config);
  }

  public put<T>(url: string, body?: any, config?: AxiosRequestConfig): AxiosObservable<T> {
    return this.axiosInstance.put(url, body, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): AxiosObservable<T> {
    return this.axiosInstance.delete(url, config);
  }

  public patch<T>(url: string, body?: any, config?: AxiosRequestConfig): AxiosObservable<T> {
    return this.axiosInstance.patch(url, body, config);
  }

  private buildRequestInterceptor(props: HttpClientConfiguration | null | undefined): void {
    this.axiosInstance
      .interceptors
      .request
      .use(
        (config) => {
          props
            ?.interceptors
            ?.request
            ?.onFulfilled
            ?.forEach((fn) => fn(config));
          return config;
        },
        (config) => {
          props
            ?.interceptors
            ?.request
            ?.onRejected
            ?.forEach((fn) => fn(config));
          return Promise.reject(config);
        }
      );
  }

  private buildResponseInterceptor(props: HttpClientConfiguration | null | undefined): void {
    this.axiosInstance
      .interceptors
      .response
      .use(
        (config) => {
          props
            ?.interceptors
            ?.response
            ?.onFulfilled
            ?.forEach((fn) => fn(config));
          return config;
        },
        (config) => {
          props
            ?.interceptors
            ?.response
            ?.onRejected
            ?.forEach((fn) => fn(config.response));
          return Promise.reject(config);
        }
      );
  }
}

import { Consumer } from './Functions';
import { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';

export default interface HttpClientConfiguration {
  responseType?: ResponseType,
  interceptors?: {
    request?: {
      onFulfilled?: Consumer<AxiosRequestConfig>[],
      onRejected?: Consumer<AxiosResponse<string>>[],
    },
    response?: {
      onFulfilled?: Consumer<AxiosRequestConfig>[],
      onRejected?: Consumer<AxiosResponse<string>>[],
    }
  },
}

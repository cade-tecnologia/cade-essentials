import { Consumer } from './Functions';
import { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';

export default interface HttpClientConstructorProps {
  responseType?: ResponseType,
  request?: {
    onFulfilled?: Consumer<AxiosRequestConfig>[],
    onRejected?: Consumer<AxiosResponse<string>>[],
  },
  response?: {
    onFulfilled?: Consumer<AxiosRequestConfig>[],
    onRejected?: Consumer<AxiosResponse<string>>[],
  }
}

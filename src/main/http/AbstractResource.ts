import QueryString from 'querystring';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';

import HttpClient from './HttpClient';
import HttpClientConfiguration from '../types/HttpClientConfiguration';
import Verify from '../verifies/Verify';

export default abstract class AbstractResource {
  protected readonly HTTP_CLIENT: HttpClient;

  private readonly BASE_URL: string;

  protected constructor(apiURL: string, resourceEndpoint: string, httpClientConfig?: HttpClientConfiguration) {

    this.HTTP_CLIENT = HttpClient.getInstance(httpClientConfig);
    this.BASE_URL = `${ apiURL }/${ resourceEndpoint }`;
  }

  protected get<T>(url = ''): Observable<T> {
    const formattedUrl = `${ this.BASE_URL }${url}`;

    return this.getResponseBody<T>(
      this.HTTP_CLIENT.get(formattedUrl)
    );
  }

  protected post<T>(body: any, url: string = ''): Observable<T> {
    const formattedUrl = `${ this.BASE_URL }${url}`;

    return this.getResponseBody<T>(
      this.HTTP_CLIENT.post<T>(formattedUrl, body)
    );
  }

  protected createUrlWithQueryParams(url: string, params: Record<string, any>) {
    const newParams = { ...params};
    Object.keys(newParams)
      .filter((key) => Verify.isNullOrUndefined(params[key]))
      .forEach((key) => delete newParams[key]);

    const query = QueryString.stringify(newParams);
    return `${url}?${query}`;
  }

  protected getResponseBody<T>(observable: AxiosObservable<T>): Observable<T> {
    return observable.pipe(
      map((value) => value.data)
    );
  }
}

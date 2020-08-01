import QueryString from 'querystring';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';

import HttpClient from './HttpClient';
import HttpClientConstructorProps from '../types/HttpClientConstructorProps';
import Verify from '../verifies/Verify';

export default abstract class AbstractResource {
  protected readonly HTTP: HttpClient;

  private readonly BASE_URL: string;

  protected constructor(resource: string, apiURL: string, httpClientConfig?: HttpClientConstructorProps) {

    this.HTTP = HttpClient.getInstance(httpClientConfig);
    this.BASE_URL = `${ apiURL }/${ resource }`;
  }

  protected get<T>(url = ''): Observable<T> {
    const formattedUrl = `${ this.BASE_URL }${url}`;

    return this.getResponseBody<T>(
      this.HTTP.get(formattedUrl)
    );
  }

  protected post<T>(body: any, url: string = ''): Observable<T> {
    const formattedUrl = `${ this.BASE_URL }${url}`;

    return this.getResponseBody<T>(
      this.HTTP.post<T>(formattedUrl, body)
    );
  }

  protected createUrlWithQueryParams(url: string, params: {[key: string]: string | null | undefined}) {
    const newParams = { ...params};
    Object.keys(newParams)
      .filter((key) => Verify.isNullOrUndefined(params[key]))
      .forEach((key) => delete newParams[key]);

    const query = QueryString.stringify(newParams);
    return `${url}?${query}`;
  }

  private getResponseBody<T>(observable: AxiosObservable<T>): Observable<T> {
    return observable.pipe(
      map((value) => value.data)
    );
  }
}

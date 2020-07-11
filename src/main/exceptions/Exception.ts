import HttpStatus from '../types/HttpStatus';

export interface ExceptionOptions {
  message: string;
  status: HttpStatus;
}

export default class Exception implements ExceptionOptions {
  public constructor(
    public readonly message: string,
    public readonly status: HttpStatus,
    public readonly error?: any,
  ) {
    if (error) {
      console.warn('Thrown error: ', error)
    }
  }
}

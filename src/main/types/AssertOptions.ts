import HttpStatus from './HttpStatus';

export default interface AssertOptions {
  errorMessage?: string;
  httpStatus?: HttpStatus;
}

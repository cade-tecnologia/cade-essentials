import Exception from '../exceptions/Exception';
import AssertOptions from '../types/AssertOptions';
import HttpStatus from '../types/HttpStatus';

export default class AssertException extends Exception {
  constructor(options: AssertOptions) {
    const defaultErrMsg = 'Exception Thrown';
    const defaultHttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    super(
      options.errorMessage ?? defaultErrMsg,
      options.httpStatus ?? defaultHttpStatus,
      null,
    );
  }
}

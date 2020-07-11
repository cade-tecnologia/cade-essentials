import Exception from '../exceptions/Exception';
import AssertOptions from '../types/AssertOptions';

export default class AssertException extends Exception {
  constructor(options: AssertOptions) {
    super(options.errorMessage, options.httpStatus, null);
  }
}

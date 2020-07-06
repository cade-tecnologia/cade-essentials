import { Exception } from './index';
import { HttpStatus } from '../index';

export default class AssertException extends Exception {
    constructor(
        public readonly message: string,
        public readonly status: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super(message, status, null);
    }
}

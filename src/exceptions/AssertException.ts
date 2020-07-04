import { HttpStatus } from '../types/HttpStatus';
import { Exception } from './Exception';

export class AssertException extends Exception {
    constructor(
        public readonly message: string,
        public readonly status: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super(message, status, null);
    }
}

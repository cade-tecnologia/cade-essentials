import { HttpStatus } from '../index';

export interface ExceptionOptions {
    message: string;
    status: HttpStatus;
}

export class Exception implements ExceptionOptions{
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

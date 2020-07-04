import { HttpStatus } from '..';

export interface ExceptionOptions {
    message: string;
    status: HttpStatus;
}

export class Exception extends Error implements ExceptionOptions{
    public constructor(
        public readonly message: string,
        public readonly status: HttpStatus,
        public readonly error?: any,
    ) {
        super(message);

        if (error) {
            console.warn('Thrown error: ', error)
        }
    }
}

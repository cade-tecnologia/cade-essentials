import { AssertException } from './exceptions/AssertException';

export default abstract class Assert {
    public static equals<T>(a: T, b: T, errorMsg: string = 'Equal assertion failed'): void {
        if (a !== b) {
            throw new AssertException(errorMsg)
        }
    }
}

import AssertException from '../exceptions/AssertException';
import Verify from '../verifies/Verify';

export default abstract class Assert {
    public static nullOrUndefined(value: any, errorMsg: string = 'Is Null or Undefined assertion failed'): void {
        if (Verify.isNotNullOrUndefined(value)) {
            throw new AssertException(errorMsg);
        }
    }

    public static notNullOrUndefined(value: any, errorMessage: string = 'Not Null assertion failed'): void {
        if (Verify.isNullOrUndefined(value)) {
            throw new AssertException(errorMessage);
        }
    }

    public static equals<T>(a: T, b: T, errorMsg: string = 'Equal assertion failed'): void {
        if (Verify.isNotEquals(a, b)) {
            throw new AssertException(errorMsg)
        }
    }

    public static notEquals(a: any, b: any, errorMsg: string = 'Not Equal assertion failed'): void {
        if (Verify.isEquals(a, b)) {
            throw new AssertException(errorMsg)
        }
    }

    public static notBlank(value: string | null | undefined, errorMsg: string = 'Not Blank assertion failed'): void {
        Assert.notNullOrUndefined(value, errorMsg);

        if (Verify.isBlank(value)) {
            throw new AssertException(errorMsg);
        }
    }

    public static blank(value: string | null | undefined, errorMsg: string = 'Blank assertion failed'): void {
        Assert.notNullOrUndefined(value, errorMsg);

        if (Verify.isNotBlank(value)) {
            throw new AssertException(errorMsg);
        }
    }

    public static notEmpty(value: Array<any> | Object | undefined | null, errorMsg: string = 'Not Empty assertion failed'): void {
        Assert.notNullOrUndefined(value, errorMsg);

        if(Verify.isEmpty(value)) {
            throw new AssertException(errorMsg);
        }
    }

    public static empty(value: Array<any> | Object | undefined | null, errorMsg: string = 'Empty assertion failed'): void {
        Assert.notNullOrUndefined(value, errorMsg);

        if(Verify.isNotEmpty(value)) {
            throw new AssertException(errorMsg);
        }
    }

    public static true(value: boolean | null | undefined, errorMessage:string = 'True assertion failed'): void {
        if (value !== true) {
            throw new AssertException(errorMessage);
        }
    }

    public static false(value: boolean | null | undefined, errorMessage:string = 'False assertion failed'): void {
        if (value !== false) {
            throw new AssertException(errorMessage);
        }
    }
}

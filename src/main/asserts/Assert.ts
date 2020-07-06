import { AssertException } from '../exceptions';
import { isEqual as isEqualLodash, isEmpty as isEmptyLodash } from 'lodash';
import { Verify } from '../verifies';

export abstract class Assert {
    public static nullOrUndefined(value: any, errorMsg: string = 'Is Null or Undefined assertion failed'): void {
        if (value !== null && value !== undefined) {
            throw new AssertException(errorMsg);
        }
    }

    public static notNullOrUndefined(value: any, errorMessage: string = 'Not Null assertion failed'): void {
        if (Verify.isNullOrUndefined(value)) {
            throw new AssertException(errorMessage);
        }
    }

    public static equals<T>(a: T, b: T, errorMsg: string = 'Equal assertion failed'): void {
        if (!isEqualLodash(a, b)) {
            throw new AssertException(errorMsg)
        }
    }

    public static notEquals(a: any, b: any, errorMsg: string = 'Not Equal assertion failed'): void {
        if (isEqualLodash(a, b)) {
            throw new AssertException(errorMsg)
        }
    }

    public static notBlank(value: string | null | undefined, errorMsg: string = 'Not Blank assertion failed'): void {
        Assert.notNullOrUndefined(value, errorMsg);

        if (!value!.toString().replace(/\s/g, '').length) {
            throw new AssertException(errorMsg);
        }
    }

    public static blank(value: string | null | undefined, errorMsg: string = 'Blank assertion failed'): void {
        Assert.notNullOrUndefined(value, errorMsg);

        if (value!.toString().replace(/\s/g, '').length > 0) {
            throw new AssertException(errorMsg);
        }
    }

    public static notEmpty(value: Array<any> | Object | undefined | null, errorMsg: string = 'Not Empty assertion failed'): void {
        Assert.notNullOrUndefined(value, errorMsg);

        const valueUpdated = typeof value === 'string'
            ? value!.toString().replace(/\s/g, '')
            : value;

        if(isEmptyLodash(valueUpdated)) {
            throw new AssertException(errorMsg);
        }
    }

    public static empty(value: Array<any> | Object | undefined | null, errorMsg: string = 'Empty assertion failed'): void {
        Assert.notNullOrUndefined(value, errorMsg);

        const valueUpdated = typeof value === 'string'
            ? value!.toString().replace(/\s/g, '')
            : value;

        if(!isEmptyLodash(valueUpdated)) {
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

import { isEqual as isEqualLodash, isEmpty as isEmptyLodash } from 'lodash';

export default abstract class Verify {
    public static isNullOrUndefined(value: any): boolean {
        return value === null || value === undefined
    }

    public static isNotNullOrUndefined(value: any): boolean {
        return value !== null && value !== undefined;
    }

    public static isEquals<T>(a: T, b: T): boolean {
        return isEqualLodash(a, b);
    }

    public static isNotEquals(a: any, b: any): boolean {
        return !isEqualLodash(a, b);
    }

    public static isBlank(value: string | undefined | null): boolean {
        if (this.isNullOrUndefined(value)) return true;

        return value!.toString().replace(/\s/g, '').length <= 0;
    }

    public static isNotBlank(value: string | undefined | null): boolean {
        if (this.isNullOrUndefined(value)) return false;

        return value!.toString().replace(/\s/g, '').length > 0;
    }

    public static isEmpty(value: Array<any> | Object | undefined | null): boolean {
        if (this.isNullOrUndefined(value)) return true;

        const valueUpdated = typeof value === 'string'
            ? value!.toString().replace(/\s/g, '')
            : value;

        return isEmptyLodash(valueUpdated);
    }

    public static isNotEmpty(value: Array<any> | Object | undefined | null): boolean {
        if (this.isNullOrUndefined(value)) return false;

        const valueUpdated = typeof value === 'string'
            ? value!.toString().replace(/\s/g, '')
            : value;

        return !isEmptyLodash(valueUpdated);
    }

    public static isTrue(value: boolean | undefined | null): boolean {
        return value === true;
    }

    public static isFalse(value: boolean | undefined | null): boolean {
        return value === false;
    }
}

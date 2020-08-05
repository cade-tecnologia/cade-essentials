import { isEmpty as _isEmpty, isEqual as _isEqual } from 'lodash';

export default abstract class Verify {
  public static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined
  }

  public static isNotNullOrUndefined(value: any): boolean {
    return value !== null && value !== undefined;
  }

  /**
   * Uses {@link _isEqual} from lodash for comparison
   */
  public static isEquals<T>(a: T, b: T): boolean {
    return _isEqual(a, b);
  }

  /**
   * Uses {@link _isEqual} from lodash for comparison
   */
  public static isNotEquals(a: any, b: any): boolean {
    return !_isEqual(a, b);
  }

  public static isBlank(value: string | undefined | null): boolean {
    if (this.isNullOrUndefined(value)) return true;

    return value!.toString().replace(/\s/g, '').length <= 0;
  }

  public static isNotBlank(value: string | undefined | null): boolean {
    if (this.isNullOrUndefined(value)) return false;

    return value!.toString().replace(/\s/g, '').length > 0;
  }

  /**
   * Uses {@link _isEmpty} from lodash to check it's empty
   */
  public static isEmpty(value: Array<any> | Object | undefined | null): boolean {
    if (this.isNullOrUndefined(value)) return true;

    const valueUpdated = typeof value === 'string'
      ? value!.toString().replace(/\s/g, '')
      : value;

    return _isEmpty(valueUpdated);
  }

  /**
   * Uses {@link _isEmpty} from lodash to check it's empty
   */
  public static isNotEmpty(value: Array<any> | Object | undefined | null): boolean {
    if (this.isNullOrUndefined(value)) return false;

    const valueUpdated = typeof value === 'string'
      ? value!.toString().replace(/\s/g, '')
      : value;

    return !_isEmpty(valueUpdated);
  }

  public static isTrue(value: boolean | undefined | null): boolean {
    return value === true;
  }

  public static isFalse(value: boolean | undefined | null): boolean {
    return value === false;
  }

  public static isNumber(value: string | number | null | undefined): boolean {
    if (this.isNullOrUndefined(value)) return false;

    return !isNaN(Number(value));
  }

  public static isNotNumber(value: string | number | null | undefined): boolean {
    if (this.isNullOrUndefined(value)) return true;

    return isNaN(Number(value));
  }
}

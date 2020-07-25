import AssertException from '../exceptions/AssertException';
import AssertOptions from '../types/AssertOptions';
import Verify from '../verifies/Verify';
import HttpStatus from '../types/HttpStatus';

export default abstract class Assert {
  public static nullOrUndefined(value: any, options?: AssertOptions): void {
    if (Verify.isNotNullOrUndefined(value)) {
      throw new AssertException(
        this.buildDefaultOptions('Is Null or Undefined assertion failed', options)
      );
    }
  }

  public static notNullOrUndefined(value: any, options?: AssertOptions): void {
    if (Verify.isNullOrUndefined(value)) {
      throw new AssertException(
        this.buildDefaultOptions('Not Null assertion failed', options)
      );
    }
  }

  public static equals<T>(a: T, b: T, options?: AssertOptions): void {
    if (Verify.isNotEquals(a, b)) {
      throw new AssertException(
        this.buildDefaultOptions('Equal assertion failed', options)
      )
    }
  }

  public static notEquals(a: any, b: any, options?: AssertOptions): void {
    if (Verify.isEquals(a, b)) {
      throw new AssertException(
        this.buildDefaultOptions('Not Equal assertion failed', options)
      )
    }
  }

  public static notBlank(value: string | null | undefined, options?: AssertOptions): void {
    const defaultOptions = this.buildDefaultOptions('Not Blank assertion failed', options);

    Assert.notNullOrUndefined(value, defaultOptions);

    if (Verify.isBlank(value)) {
      throw new AssertException(defaultOptions);
    }
  }

  public static blank(value: string | null | undefined, options?: AssertOptions): void {
    const defaultOptions = this.buildDefaultOptions('Blank assertion failed', options);

    Assert.notNullOrUndefined(value, defaultOptions);

    if (Verify.isNotBlank(value)) {
      throw new AssertException(defaultOptions);
    }
  }

  public static notEmpty(value: Array<any> | Object | undefined | null, options?: AssertOptions): void {
    const defaultOptions = this.buildDefaultOptions('Not Empty assertion failed', options);

    Assert.notNullOrUndefined(value, defaultOptions);

    if (Verify.isEmpty(value)) {
      throw new AssertException(defaultOptions);
    }
  }

  public static empty(value: Array<any> | Object | undefined | null, options?: AssertOptions): void {
    const defaultOptions = this.buildDefaultOptions('Empty assertion failed', options);

    Assert.notNullOrUndefined(value, defaultOptions);

    if (Verify.isNotEmpty(value)) {
      throw new AssertException(defaultOptions);
    }
  }

  public static true(value: boolean | null | undefined, options?: AssertOptions): void {
    if (value !== true) {
      throw new AssertException(
        this.buildDefaultOptions('True assertion failed', options)
      );
    }
  }

  public static false(value: boolean | null | undefined, options?: AssertOptions): void {
    if (value !== false) {
      throw new AssertException(
        this.buildDefaultOptions('False assertion failed', options)
      );
    }
  }

  public static number(value: string | number | null | undefined, options?: AssertOptions): void {
    const defaultOptions = this.buildDefaultOptions('Number assertion failed', options);

    Assert.notNullOrUndefined(value, defaultOptions);

    if (Verify.isNotNumber(value)) {
      throw new AssertException(defaultOptions);
    }
  }

  public static notNumber(value: string | number | null | undefined, options?: AssertOptions): void {
    const defaultOptions = this.buildDefaultOptions('Not Number assertion failed', options);

    Assert.notNullOrUndefined(value, defaultOptions);

    if (Verify.isNumber(value)) {
      throw new AssertException(defaultOptions);
    }
  }

  public static endEndsWith(value: string | null | undefined, end: string, options?: AssertOptions): void {
    const defaultOptions = this.buildDefaultOptions('Ends with assertion failed', options);

    Assert.notNullOrUndefined(value, defaultOptions);

    if (!value!.trim().endsWith(end.trim())) {
      throw new AssertException(defaultOptions);
    }
  }

  public static doesntEndsWith(value: string | null | undefined, end: string, options?: AssertOptions): void {
    const defaultOptions = this.buildDefaultOptions('Doesnt ends with assertion failed', options);

    Assert.notNullOrUndefined(value, defaultOptions);

    if (value!.trim().endsWith(end.trim())) {
      throw new AssertException(defaultOptions);
    }
  }

  private static buildDefaultOptions(defaultMsg: string, options: AssertOptions | undefined | null): AssertOptions {
    return {
      errorMessage: options?.errorMessage ?? defaultMsg,
      httpStatus: options?.httpStatus ?? HttpStatus.BAD_REQUEST,
    };
  }
}

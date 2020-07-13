import Verify from '../verifies/Verify';
import Sanitizer from '../sanitizers/Sanitizer';
import { rangeInclusive } from '../helpers';
import PhoneNumber from './phone-number/PhoneNumber';

type defaultParameterType = string | number | null | undefined;

export default abstract class Validation {
  public static isCPF(cpf: defaultParameterType): boolean {
    if (Verify.isNullOrUndefined(cpf)) return false;
    const cpfSanitized = typeof cpf === 'string'
      ? Sanitizer.cpf(cpf)
      : cpf;

    if (cpfSanitized!.toString().length !== 11) return false;
    if (Verify.isNotNumber(cpfSanitized)) return false;
    if (new RegExp(/(.)\1{10,}/).test(cpfSanitized as string)) return false;

    function calculateRemainder(result: number): number {
      const leftOver = result * 10 % 11;
      return leftOver === 10
        ? 0
        : leftOver;
    }

    function validateRemainder(reducerResult: number, charIndex: 9 | 10): boolean {
      const remainder = calculateRemainder(reducerResult);
      return remainder.toString() === cpfSanitized!.toString().charAt(charIndex)
    }

    function reducer(previousValue: number, currentValue: number, index: number): number {
      const cpfDig = Number(cpfSanitized!.toString().charAt(index));
      return (cpfDig * currentValue) + previousValue;
    }

    function firstValidation(): boolean {
      const result = rangeInclusive(2, 10)
        .reverse()
        .reduce(reducer, 0);

      return validateRemainder(result, 9)
    }

    function secondValidation(): boolean {
      const result = rangeInclusive(2, 11)
        .reverse()
        .reduce(reducer, 0);


      return validateRemainder(result, 10);
    }

    return firstValidation() && secondValidation();
  }

  public static cellPhoneNumber(number: defaultParameterType): PhoneNumber {
    return PhoneNumber.from(number);
  }
}

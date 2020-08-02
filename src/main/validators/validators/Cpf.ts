import Verify from '../../verifies/Verify';
import Sanitizer from '../../sanitizers/Sanitizer';
import { rangeInclusive } from '../../helpers';
import { defaultParameterType } from '../Validation';
import { TriFunc } from '../../types';

function calculateRemainder(result: number): number {
  const leftOver = result * 10 % 11;
  return leftOver === 10
    ? 0
    : leftOver;
}

function validateRemainder(cpfSanitized: string, reducerResult: number, charIndex: 9 | 10): boolean {
  const remainder = calculateRemainder(reducerResult);
  return remainder.toString() === cpfSanitized!.toString().charAt(charIndex)
}

function reducerEncapsulated(cpfSanitized: string): TriFunc<number, number, number, number> {
  function reducer(previousValue: number, currentValue: number, index: number): number {
    const cpfDig = Number(cpfSanitized.toString().charAt(index));
    return (cpfDig * currentValue) + previousValue;
  }

  return reducer;
}

function firstValidation(cpfSanitized: string): boolean {
  const result = rangeInclusive(2, 10)
    .reverse()
    .reduce(reducerEncapsulated(cpfSanitized), 0);

  return validateRemainder(cpfSanitized, result, 9)
}

function secondValidation(cpfSanitized: string): boolean {
  const result = rangeInclusive(2, 11)
    .reverse()
    .reduce(reducerEncapsulated(cpfSanitized), 0);


  return validateRemainder(cpfSanitized, result, 10);
}

export default function main(cpf: defaultParameterType): boolean {
  if (Verify.isNullOrUndefined(cpf)) return false;
  const cpfSanitized = typeof cpf === 'string'
    ? Sanitizer.cpf(cpf)
    : cpf;

  if (cpfSanitized!.toString().length !== 11) return false;
  if (Verify.isNotNumber(cpfSanitized)) return false;
  if (new RegExp(/(.)\1{10,}/).test(cpfSanitized as string)) return false;

  return firstValidation(cpfSanitized as string) && secondValidation(cpfSanitized as string);
}

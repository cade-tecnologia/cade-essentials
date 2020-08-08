import { Func } from '../types';

export function poper<T>(arr: T[]): T[] {
  arr.pop();
  return arr;
}

export function rangeInclusive(start: number, end: number): number[] {
  // Assert.false(start < end);

  return Array(end - start + 1)
    .fill(null)
    .map((_, index) => start + index);
}

export function pushIf<T>(arr: T[], condition: boolean | Func<T[], boolean>, value: T): T[] {
  const conditionExecuted = typeof condition === 'boolean'
    ? condition
    : condition(arr);

  if (conditionExecuted) arr.push(value);
  return arr;
}

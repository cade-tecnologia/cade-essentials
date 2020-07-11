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

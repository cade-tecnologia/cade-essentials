export function reverse(value: string): string {
  return value.toString()
    .split('')
    .reverse()
    .join('');
}

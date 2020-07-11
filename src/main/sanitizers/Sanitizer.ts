export default class Sanitizer {
  public static cpf(value: string): string {
    return value.replace(/[.\-]/g, '')
  }
}

import Verify from '../verifies/Verify';

export default class Sanitizer {
  public static cpf(value: string): string {
    return value.replace(/[.\- ]/g, '')
  }

  public static phoneNumber(value: string | number | null | undefined): string | null | undefined{
    if (Verify.isNullOrUndefined(value)) return null;
    return value!.toString().replace(/[+()\- ]/g, '');
  }
}

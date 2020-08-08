import Verify from '../verifies/Verify';

type DefaultParam = string | number | null | undefined
export default class Sanitizer {
  /**
   * se o parametro informado for null ou undefined ira retornar ele mesmo
   */
  public static cpf(value: DefaultParam): DefaultParam {
    if (Verify.isNullOrUndefined(value)) return value;
    return value!.toString().replace(/[.\- ]/g, '')
  }

  /**
   * se o parametro informado for null ou undefined ira retornar ele mesmo
   */
  public static phoneNumber(value: DefaultParam): DefaultParam {
    if (Verify.isNullOrUndefined(value)) return value;
    return value!.toString().replace(/[+()\- ]/g, '');
  }

  /**
   * se o parametro informado for null ou undefined ira retornar ele mesmo
   */
  public static cep(value: DefaultParam): DefaultParam {
    if (Verify.isNullOrUndefined(value)) return value;
    return value!.toString().replace(/[+()\- ]/g, '');
  }
}

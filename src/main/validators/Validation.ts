import { CellPhone, CPF } from './validators'
export type defaultParameterType = string | number | null | undefined;

export interface CellPhoneNumberOptions {
  withDDI?: boolean,
  withDDD?: boolean,
  startingWithNine?: boolean,
}

export default abstract class Validation {
  public static isCPF(cpf: defaultParameterType): boolean {
    return CPF(cpf);
  }

  public static cellPhoneNumber(number: defaultParameterType, options?: CellPhoneNumberOptions): boolean {
    return CellPhone(number, options);
  }
}

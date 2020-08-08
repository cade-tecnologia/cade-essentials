import { CellPhone, CPF } from './validators'
export type defaultParameterType = string | number | null | undefined;

export interface CellPhoneNumberCustomMessage {
  whenPhoneNumberIsInvalid: string,
  whenDDIIsInvalid: string,
  whenDDDIsInvalid: string,
  whenStartingWithNineIsInvalid: string,
}

export interface CellPhoneNumberOptions {
  withDDI?: boolean,
  withDDD?: boolean,
  startingWithNine?: boolean,
  useCustomMessage?: CellPhoneNumberCustomMessage,
}

export default abstract class Validation {
  public static isCPF(cpf: defaultParameterType): boolean {
    return CPF(cpf);
  }

  public static cellPhoneNumber(number: defaultParameterType, options?: CellPhoneNumberOptions): boolean | string[] {
    return CellPhone(number, options);
  }
}

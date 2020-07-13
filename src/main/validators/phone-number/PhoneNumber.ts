import { Verify } from '../../verifies';
import CountyDailCode from '../../utilities/CountyDailCodes';
import BrazilDDD from '../../utilities/BrazilDDD';
import Exception from '../../exceptions/Exception';
import HttpStatus from '../../types/HttpStatus';
import And from '../and/And';
import PhoneTypes, { WithReturnType } from './Types';
import Sanitizer from '../../sanitizers/Sanitizer';

export default class PhoneNumber {
  private readonly and: And<PhoneNumber, PhoneTypes>

  private constructor(private readonly number: string | number) {
    this.and = new And<PhoneNumber, PhoneTypes>(this, this.validate)
    this.and.isValid = this.validateActualNumber();
  }

  public static from(number: string | number | null | undefined): PhoneNumber {
    return new PhoneNumber(Sanitizer.phoneNumber(number) as string | number)
  }

  // 55986823682
  public withDDI(): WithReturnType {
    this.and.validations.add(PhoneTypes.WITH_DDI);
    return this.and.andInstance;
  }

  public withDDD(): WithReturnType {
    this.and.validations.add(PhoneTypes.WITH_DDD);
    return this.and.andInstance;
  }

  // 986823682
  public startingWithNine(): WithReturnType {
    this.and.validations.add(PhoneTypes.WITH_NINE);
    return this.and.andInstance;
  }

  public withBrazilDDI(): WithReturnType {
    this.and.validations.add(PhoneTypes.WITH_DDI);
    return this.and.andInstance;
  }


  // 61986823682
  // 161986823682
  // 5561986823682
  // 55561986823682
  // 555561986823682
  private get ddd(): string {
    const numberLength = this.number!.toString().length;
    const slice = (start: number, end: number) => this.number!.toString().slice(start, end);

    // @ts-ignore
    const numberWithoutNine = this.reversedNumber
      .split('')
      .filter((_, i) => i !== 9)
      .reverse()
      .join('');

    console.log('NUMBER: ', numberWithoutNine);
    switch (numberLength) {
      case 11: return slice(0, 2);
      case 12: return slice(1, 3);
      case 13: return slice(2, 4);
      case 14: return slice(3, 5);
      case 15: return slice(4, 6);
      default: throw new Exception(
        'Tamanho do numero de celular nao suportado',
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private get reversedNumber(): string {
    return this.number!
      .toString()
      .split('')
      .reverse()
      .join('');
  }

  private validateActualNumber(): boolean {
    if (Verify.isNullOrUndefined(this.number)) return false;
    if (Verify.isNotNumber(this.number)) return false;

    const reverseNumber = this.reversedNumber
      .slice(0, 8);

    const isLengthValid = reverseNumber.length === 8;
    const doesntRepeat = !/(.)\1{7,}/.test(this.number!.toString());

    return isLengthValid && doesntRepeat;
  }

  private validate = (): boolean => {
    this.validateLength();

    if (this.and.isValid && this.and.validations.has(PhoneTypes.WITH_DDI)) {
      this.and.isValid = CountyDailCode
        .map((cd) => cd.dialCode)
        .map((dc) => dc.replace('+', ''))
        .some((dc) => {
          return this.number.toString().startsWith(dc);
        });
    }

    if (this.and.isValid && this.and.validations.has(PhoneTypes.WITH_DDI_BRAZIL)) {
      this.and.isValid = CountyDailCode
        .find((cd) => cd.name === 'Brazil')
        ?.dialCode.replace('+', '') === this.ddd;
    }

    if (this.and.isValid && this.and.validations.has(PhoneTypes.WITH_DDD)) {
      this.and.isValid = BrazilDDD.includes(this.ddd)
    }

    if (this.and.isValid && this.and.validations.has(PhoneTypes.WITH_NINE)) {
      this.and.isValid = this.reversedNumber.slice(8, 9) === '9';
    }

    return this.and.isValid
  }

  private validateLength(): void {
    if (!this.and.isValid) return;
    const numberLength = this.number!.toString().length;

    // no validations
    // 86823682
    if (this.and.validations.size <= 0) {
      this.and.isValid = this.number!.toString().length === 8;
      return;
    }

    // all
    // 161986823682
    // 5561986823682
    // 55561986823682
    // 555561986823682
    if (this.and.validations.has(PhoneTypes.WITH_DDI) &&
      this.and.validations.has(PhoneTypes.WITH_DDD) &&
      this.and.validations.has(PhoneTypes.WITH_NINE)) {

      this.and.isValid =
        numberLength === 12 ||
        numberLength === 13 ||
        numberLength === 14 ||
        numberLength === 15;
      return;
    }

    // ---- DDI ----
    // 186823682
    // 5586823682
    // 55586823682
    // 555586823682
    if (this.and.validations.has(PhoneTypes.WITH_DDI) &&
      !this.and.validations.has(PhoneTypes.WITH_DDD) &&
      !this.and.validations.has(PhoneTypes.WITH_NINE)) {

      this.and.isValid =
        numberLength === 9 ||
        numberLength === 10 ||
        numberLength === 11 ||
        numberLength === 12;
      return;
    }

    // 16186823682
    // 556186823682
    // 5556186823682
    // 55556186823682
    if (this.and.validations.has(PhoneTypes.WITH_DDI) &&
      this.and.validations.has(PhoneTypes.WITH_DDD) &&
      !this.and.validations.has(PhoneTypes.WITH_NINE)) {
      this.and.isValid =
        numberLength === 11 ||
        numberLength === 12 ||
        numberLength === 13 ||
        numberLength === 14;
      return;
    }

    // 1986823682
    // 55986823682
    // 555986823682
    // 5555986823682
    if (this.and.validations.has(PhoneTypes.WITH_DDI) &&
      this.and.validations.has(PhoneTypes.WITH_NINE) &&
      !this.and.validations.has(PhoneTypes.WITH_DDD)) {
      this.and.isValid =
        numberLength === 10 ||
        numberLength === 11 ||
        numberLength === 12 ||
        numberLength === 13;
      return;
    }

    // ---- DDD ----
    // 6186823682
    if (this.and.validations.has(PhoneTypes.WITH_DDD) &&
      !this.and.validations.has(PhoneTypes.WITH_DDI) &&
      !this.and.validations.has(PhoneTypes.WITH_NINE)) {
      this.and.isValid = this.number!.toString().length === 10;
      return;
    }

    // 61986823682
    if (this.and.validations.has(PhoneTypes.WITH_DDD) &&
      this.and.validations.has(PhoneTypes.WITH_NINE) &&
      !this.and.validations.has(PhoneTypes.WITH_DDI)) {
      this.and.isValid = this.number!.toString().length === 11;
      return;
    }

    // ---- NINE ----
    // 986823682
    if (this.and.validations.has(PhoneTypes.WITH_NINE) &&
      !this.and.validations.has(PhoneTypes.WITH_DDI) &&
      !this.and.validations.has(PhoneTypes.WITH_DDD)) {
      this.and.isValid = this.number!.toString().length === 9;
      return;
    }

    throw new Exception(
      'Error ao validar numero celular',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

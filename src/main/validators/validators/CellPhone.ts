import Sanitizer from '../../sanitizers/Sanitizer';
import Verify from '../../verifies/Verify';
import { pushIf, reverse } from '../../helpers';
import Exception from '../../exceptions/Exception';
import HttpStatus from '../../types/HttpStatus';
import CountyDailCode from '../../utilities/CountyDailCodes';
import { BrazilDDD } from '../../utilities';
import { CellPhoneNumberOptions, defaultParameterType } from '../Validation';

function getOptions(options?: CellPhoneNumberOptions): CellPhoneNumberOptions {
  const withDDI = options?.withDDI ?? false;
  const withDDD = options?.withDDD ?? false;
  const startingWithNine = options?.startingWithNine ?? false;

  return {
    withDDI,
    withDDD,
    startingWithNine,
    useCustomMessage: options?.useCustomMessage,
  }
}

function validateNumber(numberSanitizes: string): boolean {
  const actualNumber = reverse(numberSanitizes).slice(0, 8);

  const isLengthValid = actualNumber.length === 8;
  const doesntRepeat = !new RegExp(/(.)\1{7,}/).test(actualNumber);

  return isLengthValid && doesntRepeat;
}

function validateLength(numberSanitizes: string, options?: CellPhoneNumberOptions): boolean {
  const {
    withDDI,
    withDDD,
    startingWithNine
  } = getOptions(options);

  function checkLength(length: number): boolean {
    return numberSanitizes.length === length;
  }

  if (withDDI && withDDD && startingWithNine) {
    return checkLength(12) ||
      checkLength(13) ||
      checkLength(14) ||
      checkLength(15);
  }

  if (!withDDI && !withDDD && !startingWithNine) {
    return checkLength(8);
  }

  if (withDDI && !withDDD && !startingWithNine) {
    return checkLength(9) ||
      checkLength(10) ||
      checkLength(11) ||
      checkLength(12);
  }

  if (withDDI && withDDD && !startingWithNine) {
    return checkLength(11) ||
      checkLength(12) ||
      checkLength(13) ||
      checkLength(13);
  }

  if (withDDI && !withDDD && startingWithNine) {
    return checkLength(10) ||
      checkLength(11) ||
      checkLength(12) ||
      checkLength(13);
  }

  if (!withDDI && withDDD && !startingWithNine) {
    return checkLength(10)
  }

  if (!withDDI && withDDD && startingWithNine) {
    return checkLength(11);
  }

  if (!withDDI && !withDDD && startingWithNine) {
    return checkLength(9);
  }

  throw new Exception(
    'Erro ao validar tamanho do numero telefonico, nenhuma opcao encontrada',
    HttpStatus.INTERNAL_SERVER_ERROR
  );
}

function validateDDI(numberSanitizes: string): boolean {
  return CountyDailCode
    .map((cd) => cd.dialCode)
    .map((dc) => dc.replace('+', ''))
    .some((dc) => numberSanitizes.startsWith(dc));
}

function validadeDDD(numberSanitizes: string, startingWithNine: boolean): boolean {
  const numberReverser = reverse(numberSanitizes);

  const dddReverse = startingWithNine
    ? numberReverser.slice(9, 11)
    : numberReverser.slice(8, 10);
  const ddd = reverse(dddReverse);

  return BrazilDDD.includes(ddd);
}

function validateNine(numberSanitizes: string, options?: CellPhoneNumberOptions): boolean {
  const numberReverser = reverse(numberSanitizes);
  const { withDDD, withDDI } = getOptions(options);

  const correctDDI = CountyDailCode
    .map((cd) => cd.dialCode)
    .map((dc) => dc.replace('+', ''))
    .some((dc) => numberSanitizes.startsWith(dc));
  const correctDDD = BrazilDDD.includes(reverse(numberReverser.slice(9, 11)));
  const containsNine = numberReverser.charAt(8) === '9';

  if (withDDI && withDDD) {
    return correctDDI && correctDDD && containsNine;
  }

  if (withDDI && !withDDD) {
    return correctDDI && containsNine;
  }

  if (!withDDI && withDDD) {
    return correctDDD && containsNine;
  }

  return containsNine;
}

function validate(numberSanitizes: string, options?: CellPhoneNumberOptions): boolean | string[] {
  const {
    withDDI,
    withDDD,
    startingWithNine,
    useCustomMessage,
  } = getOptions(options);

  const isDDIValid = validateDDI(numberSanitizes);
  const isDDDValid = validadeDDD(numberSanitizes, startingWithNine as boolean);
  const isNinthValid = validateNine(numberSanitizes, options);

  if (withDDI && withDDD && startingWithNine) {
    if (useCustomMessage) {
      const msg: string[] = [];
      const {
        whenDDDIsInvalid,
        whenDDIIsInvalid,
        whenStartingWithNineIsInvalid,
      } = useCustomMessage;

      pushIf<string>(msg, !isDDIValid, whenDDIIsInvalid);
      pushIf<string>(msg, !isDDDValid, whenDDDIsInvalid);
      pushIf<string>(msg, !isNinthValid, whenStartingWithNineIsInvalid);
      return pushIf<string>(msg, !isDDIValid, whenDDIIsInvalid);
    }
    return isDDIValid && isDDDValid && isNinthValid;
  }

  if (withDDI && !withDDD && !startingWithNine) {
    if (useCustomMessage) {
      const msg: string[] = [];
      const {
        whenDDIIsInvalid,
      } = useCustomMessage;

      return pushIf<string>(msg, !isDDIValid, whenDDIIsInvalid);
    }
    return isDDIValid;
  }

  if (withDDI && withDDD && !startingWithNine) {
    if (useCustomMessage) {
      const msg: string[] = [];
      const {
        whenDDIIsInvalid,
        whenDDDIsInvalid,
      } = useCustomMessage;

      pushIf<string>(msg, !isDDIValid, whenDDIIsInvalid);
      return pushIf<string>(msg, !isDDDValid, whenDDDIsInvalid);
    }

    return isDDIValid && isDDDValid;
  }

  if (withDDI && !withDDD && startingWithNine) {
    if (useCustomMessage) {
      const msg: string[] = [];
      const {
        whenDDIIsInvalid,
        whenStartingWithNineIsInvalid,
      } = useCustomMessage;

      pushIf<string>(msg, !isDDIValid, whenDDIIsInvalid);
      return pushIf<string>(msg, !isNinthValid, whenStartingWithNineIsInvalid);
    }

    return isDDIValid && isNinthValid;
  }

  if (!withDDI && withDDD && !startingWithNine) {
    if (useCustomMessage) {
      const msg: string[] = [];
      const {
        whenDDDIsInvalid,
      } = useCustomMessage;

      return pushIf<string>(msg, !isDDDValid, whenDDDIsInvalid);
    }

    return isDDDValid;
  }

  if (!withDDI && withDDD && startingWithNine) {
    if (useCustomMessage) {
      const msg: string[] = [];
      const {
        whenDDDIsInvalid,
        whenStartingWithNineIsInvalid,
      } = useCustomMessage;

      pushIf<string>(msg, !isDDDValid, whenDDDIsInvalid);
      return pushIf<string>(msg, !isNinthValid, whenStartingWithNineIsInvalid);
    }

    return isDDDValid && isNinthValid;
  }

  if (!withDDI && !withDDD && startingWithNine) {
    if (useCustomMessage) {
      const msg: string[] = [];
      const {
        whenStartingWithNineIsInvalid,
      } = useCustomMessage;

      return pushIf<string>(msg, !isNinthValid, whenStartingWithNineIsInvalid);
    }

    return isNinthValid;
  }

  if (!withDDD && !withDDD && !startingWithNine) {
    if (useCustomMessage) {
      const msg: string[] = [];
      const {
        whenPhoneNumberIsInvalid,
      } = useCustomMessage;

      return pushIf<string>(msg, !validateNumber(numberSanitizes), whenPhoneNumberIsInvalid);
    }

    return validateNumber(numberSanitizes);
  }

  throw new Exception(
    'Nenhuma opcao encontrada para validar numero de telefone',
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
}

export default function main(number: defaultParameterType, options?: CellPhoneNumberOptions): boolean | string[] {
  const numberSanitizes = Sanitizer.phoneNumber(number);

  function defaultReturn() {
    if (options?.useCustomMessage) {
      return [options.useCustomMessage.whenPhoneNumberIsInvalid]
    }
    return false;
  }

  if (Verify.isNullOrUndefined(numberSanitizes)) return defaultReturn();
  if (Verify.isNotNumber(numberSanitizes)) return defaultReturn();

  if (!validateNumber(numberSanitizes as string)) return defaultReturn();

  if (!validateLength(numberSanitizes as string, options)) defaultReturn();

  return validate(numberSanitizes as string, options);
}

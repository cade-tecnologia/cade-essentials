import { BrazilDDD, CellPhoneNumberCustomMessage, CountyDailCodes, rangeInclusive, Validation } from '../../main';

describe('Validation', () => {
  describe('CPF', () => {
    test('Should only return true', () => {
      expect(Validation.isCPF('11116506670'))
        .toBe(true);
      expect(Validation.isCPF(70427851009))
        .toBe(true)
      expect(Validation.isCPF('043.594.570-06'))
        .toBe(true);
      expect(Validation.isCPF(29704667086))
        .toBe(true);
      expect(Validation.isCPF(18506095000))
        .toBe(true);
      expect(Validation.isCPF('530.194.510-60'))
        .toBe(true)
      expect(Validation.isCPF('048.448.730-24'))
        .toBe(true);
    });

    test('Should only return false', () => {
      expect(Validation.isCPF('530.194.510-62'))
        .toBe(false);
      expect(Validation.isCPF('530.194.555-62'))
        .toBe(false);
      expect(Validation.isCPF('53019451099'))
        .toBe(false);
      expect(Validation.isCPF(33019451062))
        .toBe(false);
      expect(Validation.isCPF('530.194.510-'))
        .toBe(false);
      expect(Validation.isCPF('530.194.-62'))
        .toBe(false);
      expect(Validation.isCPF('53062'))
        .toBe(false);
      expect(Validation.isCPF('asassssssss'))
        .toBe(false);
      expect(Validation.isCPF(1234))
        .toBe(false);
      expect(Validation.isCPF(null))
        .toBe(false);
      expect(Validation.isCPF(undefined))
        .toBe(false);
    });

    describe('Validate repeated numbers', () => {
      const repeatedNumbers = rangeInclusive(0, 9)
        .map((number) => Array(11).fill(number))
        .map((arr) => arr.join(''));

      function addCPFMask(cpf: string): string {
        const one = cpf.slice(0, 3);
        const two = cpf.slice(3, 6);
        const three = cpf.slice(6, 9);
        const four = cpf.slice(9, 11);

        return `${one}.${two}.${three}-${four}`;
      }

      repeatedNumbers
        .forEach(validateCPF);
      repeatedNumbers.map(addCPFMask).forEach(validateCPF)

      function validateCPF(cpf: string | number): void {
        test(`CPF ${ cpf } should return false`, () => {
          expect(Validation.isCPF(cpf))
            .toBe(false);
        });
      }
    })
  });

  describe('Cell Phone Number', () => {
    const phoneNumberMsg= 'Numero Invalido';
    const startingWithNineMsg = 'Digito 9 invalido';
    const ddiMsg = 'DDI invalido';
    const dddMsg = 'DDD invalido'
    const message: CellPhoneNumberCustomMessage = {
      whenPhoneNumberIsInvalid: phoneNumberMsg,
      whenStartingWithNineIsInvalid: startingWithNineMsg,
      whenDDIIsInvalid: ddiMsg,
      whenDDDIsInvalid: dddMsg,
    };

    test('Should only return true', () => {
      expect(
        Validation.cellPhoneNumber(
          5511986823682,
          { withDDD: true, withDDI: true, startingWithNine: true })
      ).toBe(true);
      expect(
        Validation.cellPhoneNumber(
          '(61) 9 8682-3682',
          { withDDD: true, startingWithNine: true})
      ).toBe(true);
      expect(
        Validation.cellPhoneNumber(
          '+501 (61) 9 8682-3666',
          { withDDI: true, withDDD: true, startingWithNine: true})
      ).toBe(true);
      expect(
        Validation.cellPhoneNumber(
          12177773333,
          {withDDI: true, withDDD: true}
        )
      ).toBe(true);
      expect(
        Validation.cellPhoneNumber(88887732)
      ).toBe(true);
    });

    describe('Testing all DDDs', () => {
      function testAllBrazilDDDs(number: string): void {
        test(`Number: ${number} should be valid`, () => {
          expect(Validation.cellPhoneNumber(number, { withDDD: true}))
            .toBe(true)
        });
      }
      BrazilDDD
        .map((ddd) => `(${ddd}) 88823333`)
        .forEach(testAllBrazilDDDs);
    });

    describe('Testing all DDIs', () => {
      function testAllCountyDialCodes(number: string): void {
        test(`Number: ${number} should be valid`, () => {
          expect(Validation.cellPhoneNumber(number, { withDDI: true, startingWithNine: true, withDDD: true }))
            .toBe(true);
        })
      }

      CountyDailCodes
        .map((cdc) => cdc.dialCode)
        .map((dc) => dc.replace('+', ''))
        .map((dc) => `+${dc} (61) 9 8682-3666`)
        .forEach(testAllCountyDialCodes);
    });

    test('Testing all positive cases and return an empty array', () => {
      expect(
        Validation.cellPhoneNumber(
          5511986823682,
          {
            withDDD: true,
            withDDI: true,
            startingWithNine: true,
            useCustomMessage: message,
          })
      ).toStrictEqual([]);
      expect(
        Validation.cellPhoneNumber(
          '(61) 9 8682-3682',
          {
            withDDD: true,
            startingWithNine: true,
            useCustomMessage: message,
          })
      ).toStrictEqual([]);
      expect(
        Validation.cellPhoneNumber(
          '+501 (61) 9 8682-3666',
          {
            withDDI: true,
            withDDD: true,
            startingWithNine: true,
            useCustomMessage: message,
          })
      ).toStrictEqual([]);
      expect(
        Validation.cellPhoneNumber(
          12177773333,
          {
            withDDI: true,
            withDDD: true,
            useCustomMessage: message,
          }
        )
      ).toStrictEqual([]);
      expect(
        Validation.cellPhoneNumber(
          88887732,
          { useCustomMessage: message }
        )
      ).toStrictEqual([]);
    })

    describe('Testing all DDDs using customMessage', () => {
      function testAllBrazilDDDs(number: string): void {
        test(`Number: ${number} should be valid`, () => {
          expect(Validation.cellPhoneNumber(
            number,
            {
              withDDD: true,
              useCustomMessage: message
            }))
            .toStrictEqual([])
        });
      }
      BrazilDDD
        .map((ddd) => `(${ddd}) 88823333`)
        .forEach(testAllBrazilDDDs);
    })

    describe('Testing all DDIs and return an empty array', () => {
      function testAllCountyDialCodes(number: string): void {
        test(`Number: ${number} should be valid`, () => {
          expect(Validation.cellPhoneNumber(
            number,
            {
              withDDI: true,
              startingWithNine: true,
              withDDD: true,
              useCustomMessage: message
            }))
            .toStrictEqual([]);
        })
      }

      CountyDailCodes
        .map((cdc) => cdc.dialCode)
        .map((dc) => dc.replace('+', ''))
        .map((dc) => `+${dc} (61) 9 8682-3666`)
        .forEach(testAllCountyDialCodes);
    })
  });
})

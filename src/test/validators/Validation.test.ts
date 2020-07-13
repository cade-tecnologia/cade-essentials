import { BrazilDDD, CountyDailCodes, rangeInclusive, Validation } from '../../main';

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
  });

  describe('Cell Phone Number', () => {
    test('Should only return true', () => {
      // expect(Validation.cellPhoneNumber(5511986823682)
      //   .withBrazilDDI()
      //   .and()
      //   .withDDD()
      //   .and()
      //   .startingWithNine()
      //   .validade())
      //   .toBe(true);
      // expect(Validation.cellPhoneNumber('(61) 9 8682-3682')
      //   .startingWithNine()
      //   .and()
      //   .withDDD()
      //   .validade()
      // ).toBe(true);
      // expect(Validation.cellPhoneNumber('+501 (61) 9 8682-3666')
      //   .withDDI()
      //   .and()
      //   .startingWithNine()
      //   .and()
      //   .withDDD()
      //   .validade()
      // ).toBe(true);
    });

    function testAllCountyDialCodes(number: string): void {
      test(`Number: ${number} should be valid`, () => {
        expect(Validation.cellPhoneNumber(number)
          .withDDI()
          .and()
          .startingWithNine()
          .and()
          .withDDD()
          .validade()
        ).toBe(true);
      })
    }

    function testAllBrazilDDDs(number: string): void {
      test(`Number: ${number} should be valid`, () => {
        expect(Validation.cellPhoneNumber(number)
          .withDDD()
          .validade()
        ).toBe(true)
      })
    }

    CountyDailCodes
      .map((cdc) => cdc.dialCode)
      .map((dc) => dc.replace('+', ''))
      .map((dc) => `+${dc} (61) 9 8682-3666`)
      .forEach(testAllCountyDialCodes);
    BrazilDDD
      .map((ddd) => `(${ddd}) 88823333`)
      .forEach(testAllBrazilDDDs);
  });
})

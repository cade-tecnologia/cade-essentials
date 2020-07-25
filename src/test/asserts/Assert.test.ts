import { Assert, AssertException, AssertOptions } from '../../main';
import HttpStatus from '../../main/types/HttpStatus';

const errMsg: AssertOptions = {
  errorMessage: 'i never gonna give you up',
  httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
};

const spyNotNullOrUndefined = jest.spyOn(Assert, 'notNullOrUndefined');

describe('Assert', () => {
  describe('Equals', () => {
    test('asserts equal should not fail', () => {
      expect(Assert.equals(null, null))
        .toBeUndefined();
      expect(Assert.equals(undefined, undefined))
        .toBeUndefined();
      expect(Assert.equals({}, {}))
        .toBeUndefined();
      expect(Assert.equals([], []))
        .toBeUndefined();
      expect(Assert.equals('', ''))
        .toBeUndefined();
      expect(Assert.equals('a', 'a'))
        .toBeUndefined();
      expect(Assert.equals(1, 1))
        .toBeUndefined();
      expect(Assert.equals(true, true))
        .toBeUndefined();
      expect(Assert.equals({ a: 'a' }, { a: 'a' }))
        .toBeUndefined();
      expect(Assert.equals(
        { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } },
        { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } }
      ))
    });

    test('asserts equals should fail', () => {
      expect(
        () => Assert.equals(undefined, null)
      ).toThrow(AssertException);
      expect(
        () => Assert.equals({}, [])
      ).toThrow(AssertException);
      expect(
        () => Assert.equals('', null)
      ).toThrow(AssertException);
      expect(
        () => Assert.equals('', undefined)
      ).toThrow(AssertException);
      expect(
        () => Assert.equals('a', 'c')
      ).toThrow(AssertException);
      expect(
        () => Assert.equals({ a: 'a', b: { c: 'c' } }, { a: 'a' })
      ).toThrow(AssertException);
      expect(
        () => Assert.equals(1, 2)
      ).toThrow(AssertException);
      expect(
        () => Assert.equals(true, false)
      ).toThrow(AssertException);
      expect(
        () => Assert.equals(1, 2, errMsg)
      ).toThrow(errMsg.errorMessage);
      expect(
        () => Assert.equals(
          { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } },
          { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['c'] } }] } } } } } } }
        )
      ).toThrow(AssertException);
    });
  });

  describe('Not equal', () => {
    test('asserts Not Equals should not fail', () => {
      expect(Assert.notEquals(undefined, null))
        .toBeUndefined();
      expect(Assert.notEquals('', null))
        .toBeUndefined();
      expect(Assert.notEquals('', undefined))
        .toBeUndefined();
      expect(Assert.notEquals('', '0'))
        .toBeUndefined();
      expect(Assert.notEquals('a', 'b'))
        .toBeUndefined();
      expect(Assert.notEquals(1, 2))
        .toBeUndefined();
      expect(Assert.notEquals({}, []))
        .toBeUndefined();
      expect(Assert.notEquals({ a: 'a' }, { a: 'v' }))
        .toBeUndefined();
      expect(Assert.notEquals(
        { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } },
        { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['99'] } }] } } } } } } }
      )).toBeUndefined();
    });

    test('asserts Not Equals should fail', () => {
      expect(
        () => Assert.notEquals(undefined, undefined)
      ).toThrow(AssertException);
      expect(
        () => Assert.notEquals(null, null)
      ).toThrow(AssertException);
      expect(
        () => Assert.notEquals({}, {})
      ).toThrow(AssertException);
      expect(
        () => Assert.notEquals('', '')
      ).toThrow(AssertException);
      expect(
        () => Assert.notEquals('a', 'a')
      ).toThrow(AssertException);
      expect(
        () => Assert.notEquals(1, 1)
      ).toThrow(AssertException);
      expect(
        () => Assert.notEquals(true, true)
      ).toThrow(AssertException);
      expect(
        () => Assert.notEquals(1, 1, errMsg)
      ).toThrow(errMsg.errorMessage);
      expect(
        () => Assert.notEquals(
          { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } },
          { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } }
        )
      ).toThrow(AssertException);
    });
  });

  describe('Null or undefined', () => {
    test('asserts Null Or Undefined should not fail', () => {
      expect(Assert.nullOrUndefined(null))
        .toBeUndefined();
      expect(Assert.nullOrUndefined(undefined))
        .toBeUndefined();
    });

    test('asserts Null Or Undefined should fail', () => {
      expect(
        () => Assert.nullOrUndefined('')
      ).toThrow(AssertException);
      expect(
        () => Assert.nullOrUndefined({})
      ).toThrow(AssertException);
      expect(
        () => Assert.nullOrUndefined([])
      ).toThrow(AssertException);
      expect(
        () => Assert.nullOrUndefined('tst')
      ).toThrow(AssertException);
      expect(
        () => Assert.nullOrUndefined(false)
      ).toThrow(AssertException);
      expect(
        () => Assert.nullOrUndefined(true)
      ).toThrow(AssertException);
      expect(
        () => Assert.nullOrUndefined(0)
      ).toThrow(AssertException);
      expect(
        () => Assert.nullOrUndefined(1)
      ).toThrow(AssertException);
      expect(
        () => Assert.nullOrUndefined({ a: 'a' })
      ).toThrow(AssertException);
      expect(
        () => Assert.nullOrUndefined(0, errMsg)
      ).toThrow(errMsg.errorMessage);
    });
  });

  describe('Not null or undefined', () => {
    test('asserts Not Null Or Undefined should not fail', () => {
      expect(Assert.notNullOrUndefined(''))
        .toBeUndefined();
      expect(Assert.notNullOrUndefined({}))
        .toBeUndefined();
      expect(Assert.notNullOrUndefined([]))
        .toBeUndefined();
      expect(Assert.notNullOrUndefined(false))
        .toBeUndefined();
      expect(Assert.notNullOrUndefined(true))
        .toBeUndefined();
      expect(Assert.notNullOrUndefined(0))
        .toBeUndefined();
      expect(Assert.notNullOrUndefined(1))
        .toBeUndefined();
      expect(Assert.notNullOrUndefined({ a: 'a' }))
        .toBeUndefined();
      expect(Assert.notNullOrUndefined(['a', 'b']))
        .toBeUndefined();
      expect(Assert.notNullOrUndefined('a'))
        .toBeUndefined();
    });

    test('asserts Not Null Or Undefined should fail', () => {
      expect(
        () => Assert.notNullOrUndefined(undefined)
      ).toThrow(AssertException);
      expect(
        () => Assert.notNullOrUndefined(null)
      ).toThrow(AssertException);
      expect(
        () => Assert.notNullOrUndefined(null, errMsg)
      ).toThrow(errMsg.errorMessage)
    })
  });

  describe('Not blank', () => {
    const spyNotNullOrUndefined = jest.spyOn(Assert, 'notNullOrUndefined');

    test('Not Blank should not fail', () => {
      expect(Assert.notBlank('a'))
        .toBeUndefined();
      expect(Assert.notBlank('   a'))
        .toBeUndefined();
      expect(Assert.notBlank('a      '))
        .toBeUndefined();
      expect(Assert.notBlank('   a   '))
        .toBeUndefined();
      expect(Assert.notBlank(123 as unknown as string))
        .toBeUndefined();
      expect(spyNotNullOrUndefined).toBeCalled();
    });

    test('Not Blank should fail', () => {
      expect(() => Assert.notBlank(''))
        .toThrow(AssertException);
      expect(() => Assert.notBlank('               '))
        .toThrow(AssertException);
      expect(() => Assert.notBlank(null))
        .toThrow(AssertException);
      expect(() => Assert.notBlank(undefined))
        .toThrow(AssertException);
      expect(() => Assert.notBlank(null, errMsg))
        .toThrow(errMsg.errorMessage)
      expect(spyNotNullOrUndefined).toBeCalled();
    });
  });

  describe('Blank', () => {
    test('Blank should not fail', () => {
      expect(Assert.blank(''))
        .toBeUndefined();
      expect(Assert.blank('           '))
        .toBeUndefined();
      expect(spyNotNullOrUndefined).toBeCalled();
    });

    test('Blank should fail', () => {
      expect(() => Assert.blank('d'))
        .toThrow(AssertException);
      expect(() => Assert.blank('    d      '))
        .toThrow(AssertException);
      expect(() => Assert.blank('      d'))
        .toThrow(AssertException);
      expect(() => Assert.blank('d       '))
        .toThrow(AssertException);
      expect(() => Assert.blank(123 as unknown as string))
        .toThrow(AssertException);
      expect(() => Assert.blank(null))
        .toThrow(AssertException);
      expect(() => Assert.blank(undefined))
        .toThrow(AssertException);
      expect(() => Assert.blank(null, errMsg))
        .toThrow(errMsg.errorMessage);
      expect(spyNotNullOrUndefined).toBeCalled();
    });
  });

  describe('Not empty', function () {
    test('Not Empty should not fail', () => {
      expect(Assert.notEmpty(['a']))
        .toBeUndefined();
      expect(Assert.notEmpty([1, 2, 3]))
        .toBeUndefined();
      expect(Assert.notEmpty([{ a: 1 }, { b: 2 }]))
        .toBeUndefined();
      expect(Assert.notEmpty({ a: 'a' }))
        .toBeUndefined();
      expect(Assert.notEmpty({ a: { b: 'c' } }))
        .toBeUndefined();
      expect(Assert.notEmpty('asd'))
        .toBeUndefined();
      expect(spyNotNullOrUndefined).toBeCalled()
    });
    test('Not Empty should fail', () => {
      expect(() => Assert.notEmpty(''))
        .toThrow(AssertException);
      expect(() => Assert.notEmpty('    '))
        .toThrow(AssertException);
      expect(() => Assert.notEmpty(12))
        .toThrow(AssertException);
      expect(() => Assert.notEmpty(false))
        .toThrow(AssertException);
      expect(() => Assert.notEmpty(undefined))
        .toThrow(AssertException);
      expect(() => Assert.notEmpty(null))
        .toThrow(AssertException);
      expect(() => Assert.notEmpty(null, errMsg))
        .toThrow(errMsg.errorMessage);
      expect(spyNotNullOrUndefined).toBeCalled()
    });
  });

  describe('Empty', () => {
    test('Empty should not fail', () => {
      expect(Assert.empty([]))
        .toBeUndefined();
      expect(Assert.empty({}))
        .toBeUndefined();
      expect(Assert.empty(12))
        .toBeUndefined();
      expect(Assert.empty('    '))
        .toBeUndefined();
      expect(Assert.empty(''))
        .toBeUndefined();
    });

    test('Empty should fail', () => {
      expect(() => Assert.empty(['s']))
        .toThrow(AssertException);
      expect(() => Assert.empty({ a: 's' }))
        .toThrow(AssertException);
      expect(() => Assert.empty('asd'))
        .toThrow(AssertException);
      expect(() => Assert.empty(undefined))
        .toThrow(AssertException);
      expect(() => Assert.empty(null))
        .toThrow(AssertException);
      expect(() => Assert.empty(null, errMsg))
        .toThrow(errMsg.errorMessage);
    });
  });

  describe('True', () => {
    test('True should not fail', () => {
      expect(Assert.true(true))
        .toBeUndefined()
    });

    test('True should fail', () => {
      expect(() => Assert.true(false))
        .toThrow(AssertException);
      expect(() => Assert.true(null))
        .toThrow(AssertException);
      expect(() => Assert.true(undefined))
        .toThrow(AssertException);
      expect(() => Assert.true('' as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.true('a' as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.true([] as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.true(['a'] as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.true({} as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.true({ a: 'a' } as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.true(0 as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.true(1 as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.true(false, errMsg))
        .toThrow(errMsg.errorMessage)
    });
  });

  describe('False', () => {
    test('False should not fail', () => {
      expect(Assert.false(false))
        .toBeUndefined()
    });
    test('False should fail', () => {
      expect(() => Assert.false(true))
        .toThrow(AssertException);
      expect(() => Assert.false(null))
        .toThrow(AssertException);
      expect(() => Assert.false(undefined))
        .toThrow(AssertException);
      expect(() => Assert.false('' as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.false('a' as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.false([] as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.false(['a'] as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.false({} as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.false({ a: 'a' } as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.false(0 as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.false(1 as unknown as boolean))
        .toThrow(AssertException);
      expect(() => Assert.false(true, errMsg))
        .toThrow(errMsg.errorMessage);
    })
  });

  describe('Number', () => {
    test('Number should not fail', () => {
      expect(Assert.number(123))
        .toBeUndefined();
      expect(Assert.number('123'))
        .toBeUndefined();
      expect(spyNotNullOrUndefined)
        .toBeCalled();
    });

    test('Number should fail', () => {
      expect(() => Assert.number('as'))
        .toThrow(AssertException);
      expect(() => Assert.number('as123'))
        .toThrow(AssertException);
      expect(() => Assert.number('123as'))
        .toThrow(AssertException);
      expect(() => Assert.number('as123as'))
        .toThrow(AssertException);
      expect(() => Assert.number(null))
        .toThrow(AssertException);
      expect(() => Assert.number(undefined))
        .toThrow(AssertException);
      expect(() => Assert.number('asd12', errMsg))
        .toThrow(errMsg.errorMessage);
      expect(spyNotNullOrUndefined)
        .toBeCalled();
    });
  });

  describe('Not number', () => {
    test('Not number should not fail', () => {
      expect(Assert.notNumber('as'))
        .toBeUndefined();
      expect(Assert.notNumber('as123'))
        .toBeUndefined();
      expect(Assert.notNumber('123as'))
        .toBeUndefined();
      expect(Assert.notNumber('as123as'))
        .toBeUndefined();
      expect(Assert.notNumber('asd12', errMsg))
        .toBeUndefined();
      expect(spyNotNullOrUndefined)
        .toBeCalled();
    });

    test('Not number should fail', () => {
      expect(() => Assert.notNumber(123))
        .toThrow(AssertException);
      expect(() => Assert.notNumber('123'))
        .toThrow(AssertException);
    })
  });

  describe('Ends with', () => {
    test('Ends with should not fail', () => {
      expect(Assert.endEndsWith('FormStoreHelperMixin', 'Mixin'))
        .toBeUndefined();
      expect(Assert.endEndsWith('testeEAE', 'EAE'))
        .toBeUndefined();
      expect(Assert.endEndsWith('KKKKKKKK', 'K'))
        .toBeUndefined();
      expect(Assert.endEndsWith('   Sera q ta facionando      ', 'do'))
        .toBeUndefined();
      expect(Assert.endEndsWith('  ultimo    tes    te   ', '    e   '))
        .toBeUndefined();
      expect(Assert.endEndsWith('  ultimo de verda  de    ', '    de'))
        .toBeUndefined();
      expect(Assert.endEndsWith('Agora eh pra valer o   ultim   o', 'm   o       '))
        .toBeUndefined();
      expect(spyNotNullOrUndefined)
        .toBeCalled();
    });

    test('Ends with should fail', () => {
      expect(() => Assert.endEndsWith('FormStoreHelper', 'Mixin'))
        .toThrow(AssertException);
      expect(() => Assert.endEndsWith('eae', 'oi'))
        .toThrow(AssertException);
      expect(() => Assert.endEndsWith('  lol   ', '   dota'))
        .toThrow(AssertException);
      expect(() => Assert.endEndsWith('  Dota', '   lol    '))
        .toThrow(AssertException);
      expect(() => Assert.endEndsWith('eae', 'E'))
        .toThrow(AssertException);
      expect(() => Assert.endEndsWith(null, '   dota'))
        .toThrow(AssertException);
      expect(() => Assert.endEndsWith(undefined, '   dota'))
        .toThrow(AssertException);
      expect(() => Assert.endEndsWith('  lol   ', '   dota', errMsg))
        .toThrow(errMsg.errorMessage);
      expect(spyNotNullOrUndefined)
        .toBeCalled();
    });
  });

  describe('Doesnt ends with', () => {
    test('Doesnt ends with should not fail', () => {
      expect(Assert.doesntEndsWith('eae', 'Kkkk'))
        .toBeUndefined();
      expect(Assert.doesntEndsWith('  lol   ', '   dota'))
        .toBeUndefined();
      expect(Assert.doesntEndsWith('  Dota', '   lol    '))
        .toBeUndefined();
      expect(Assert.doesntEndsWith('eae', 'E'))
        .toBeUndefined();
      expect(Assert.doesntEndsWith('  lol   ', '   dota'))
        .toBeUndefined();
      expect(spyNotNullOrUndefined)
        .toBeCalled();
    });

    test('Doesnt ends with should fail', () => {
      expect(() => Assert.doesntEndsWith('testeEAE', 'EAE'))
        .toThrow(AssertException);
      expect(() => Assert.doesntEndsWith('KKKKKKKK', 'K'))
        .toThrow(AssertException);
      expect(() => Assert.doesntEndsWith('   Sera q ta facionando      ', 'do'))
        .toThrow(AssertException);
      expect(() => Assert.doesntEndsWith('  ultimo    tes    te   ', '    e   '))
        .toThrow(AssertException);
      expect(() => Assert.doesntEndsWith('  ultimo de verda  de    ', '    de'))
        .toThrow(AssertException);
      expect(() => Assert.doesntEndsWith('Agora eh pra valer o   ultim   o', 'm   o       '))
        .toThrow(AssertException);
      expect(() => Assert.doesntEndsWith('ffff', 'f', errMsg))
        .toThrow(errMsg.errorMessage)
      expect(spyNotNullOrUndefined)
        .toBeCalled();
    });
  });
});

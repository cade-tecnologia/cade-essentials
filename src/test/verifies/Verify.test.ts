import { Verify } from '../../main';

const spyIsNullOrUndefined = jest.spyOn(Verify, 'isNullOrUndefined');

describe('Is null or undefined', () => {
  test('Is null or undefined should return only true', () => {
    expect(Verify.isNullOrUndefined(undefined))
      .toBe(true);
    expect(Verify.isNullOrUndefined(null))
      .toBe(true);
  });

  test('Is null or undefined should return only false', () => {
    expect(Verify.isNullOrUndefined(''))
      .toBe(false);
    expect(Verify.isNullOrUndefined('a'))
      .toBe(false);
    expect(Verify.isNullOrUndefined([]))
      .toBe(false);
    expect(Verify.isNullOrUndefined({}))
      .toBe(false);
    expect(Verify.isNullOrUndefined(1))
      .toBe(false);
    expect(Verify.isNullOrUndefined(0))
      .toBe(false);
    expect(Verify.isNullOrUndefined(true))
      .toBe(false);
    expect(Verify.isNullOrUndefined(false))
      .toBe(false);
  });
});

describe('Is not null or undefined', () => {
  test('Is not null or undefined should return only true', () => {
    expect(Verify.isNotNullOrUndefined(''))
      .toBe(true);
    expect(Verify.isNotNullOrUndefined([]))
      .toBe(true);
    expect(Verify.isNotNullOrUndefined({}))
      .toBe(true);
    expect(Verify.isNotNullOrUndefined('a'))
      .toBe(true);
    expect(Verify.isNotNullOrUndefined(['a']))
      .toBe(true);
    expect(Verify.isNotNullOrUndefined({ a: 'a' }))
      .toBe(true);
    expect(Verify.isNotNullOrUndefined(true))
      .toBe(true);
    expect(Verify.isNotNullOrUndefined(false))
      .toBe(true);
    expect(Verify.isNotNullOrUndefined(1))
      .toBe(true);
    expect(Verify.isNotNullOrUndefined(0))
      .toBe(true);
  });

  test('Is not null or undefined should return only false', () => {
    expect(Verify.isNotNullOrUndefined(undefined))
      .toBe(false);
    expect(Verify.isNotNullOrUndefined(null))
      .toBe(false);
  });
});

describe('Is equals', () => {
  test('Is equals should return only true', () => {
    expect(Verify.isEquals('a', 'a'))
      .toBe(true);
    expect(Verify.isEquals(1, 1))
      .toBe(true);
    expect(Verify.isEquals(null, null))
      .toBe(true);
    expect(Verify.isEquals(undefined, undefined))
      .toBe(true);
    expect(Verify.isEquals(true, true))
      .toBe(true);
    expect(Verify.isEquals(false, false))
      .toBe(true);
    expect(Verify.isEquals([], []))
      .toBe(true);
    expect(Verify.isEquals({}, {}))
      .toBe(true);
    expect(Verify.isEquals('', ''))
      .toBe(true);
    expect(Verify.isEquals({ a: 'a' }, { a: 'a' }))
      .toBe(true);
    expect(Verify.isEquals(
      { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } },
      { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } }
    )).toBe(true);
  });

  test('Is equals should return only false', () => {
    expect(Verify.isEquals(undefined, null))
      .toBe(false);
    expect(Verify.isEquals({}, []))
      .toBe(false);
    expect(Verify.isEquals(1, 0))
      .toBe(false);
    expect(Verify.isEquals('a', ''))
      .toBe(false);
    expect(Verify.isEquals(true, false))
      .toBe(false);
    expect(Verify.isEquals(
      { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['g'] } }] } } } } } } },
      { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } }
    )).toBe(false);
  });
});

describe('Is not equals', () => {
  test('Is not equals should return only true', () => {
    expect(Verify.isNotEquals(null, undefined))
      .toBe(true);
    expect(Verify.isNotEquals(1, 0))
      .toBe(true);
    expect(Verify.isNotEquals('a', ''))
      .toBe(true);
    expect(Verify.isNotEquals([], {}))
      .toBe(true);
    expect(Verify.isNotEquals(true, false))
      .toBe(true);
    expect(Verify.isNotEquals(
      { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } },
      { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['g'] } }] } } } } } } }
    )).toBe(true);
  });

  test('Is not equals should return only false', () => {
    expect(Verify.isNotEquals('a', 'a'))
      .toBe(false);
    expect(Verify.isNotEquals(1, 1))
      .toBe(false);
    expect(Verify.isNotEquals(null, null))
      .toBe(false);
    expect(Verify.isNotEquals(undefined, undefined))
      .toBe(false);
    expect(Verify.isNotEquals(true, true))
      .toBe(false);
    expect(Verify.isNotEquals(false, false))
      .toBe(false);
    expect(Verify.isNotEquals([], []))
      .toBe(false);
    expect(Verify.isNotEquals({}, {}))
      .toBe(false);
    expect(Verify.isNotEquals('', ''))
      .toBe(false);
    expect(Verify.isNotEquals({ a: 'a' }, { a: 'a' }))
      .toBe(false);
    expect(Verify.isNotEquals(
      { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } },
      { a: { b: { c: { d: { e: { f: { g: 'eae', h: [{ i: { j: ['a'] } }, { k: { b: ['b'] } }] } } } } } } }
    )).toBe(false);
  });
});

describe('Is blank', () => {
  test('Is blank should return only true', () => {
    expect(Verify.isBlank(''))
      .toBe(true);
    expect(Verify.isBlank('               '))
      .toBe(true);
    expect(Verify.isBlank(null))
      .toBe(true);
    expect(Verify.isBlank(undefined))
      .toBe(true);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  });

  test('Is blank should return only false', () => {
    expect(Verify.isBlank('a'))
      .toBe(false);
    expect(Verify.isBlank('       a'))
      .toBe(false);
    expect(Verify.isBlank('a            '))
      .toBe(false);
    expect(Verify.isBlank('      a         '))
      .toBe(false);
    expect(Verify.isBlank(123 as unknown as string))
      .toBe(false);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  });
});

describe('Is not blank', () => {
  test('Is not blank should return only true', () => {
    expect(Verify.isNotBlank('a'))
      .toBe(true);
    expect(Verify.isNotBlank('     a'))
      .toBe(true);
    expect(Verify.isNotBlank('a        '))
      .toBe(true);
    expect(Verify.isNotBlank('     a      '))
      .toBe(true);
    expect(Verify.isNotBlank(123 as unknown as string))
      .toBe(true);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  });

  test('Is not blank should return only false', () => {
    expect(Verify.isNotBlank(''))
      .toBe(false);
    expect(Verify.isNotBlank('          '))
      .toBe(false);
    expect(Verify.isNotBlank(null))
      .toBe(false);
    expect(Verify.isNotBlank(undefined))
      .toBe(false);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  });
});

describe('Is empty', () => {
  test('Is empty should return only true', () => {
    expect(Verify.isEmpty([]))
      .toBe(true);
    expect(Verify.isEmpty({}))
      .toBe(true);
    expect(Verify.isEmpty(123))
      .toBe(true);
    expect(Verify.isEmpty('       '))
      .toBe(true);
    expect(Verify.isEmpty(''))
      .toBe(true);
    expect(Verify.isEmpty(null))
      .toBe(true);
    expect(Verify.isEmpty(undefined))
      .toBe(true);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  });

  test('Is empty should return only false', () => {
    expect(Verify.isEmpty(['a']))
      .toBe(false);
    expect(Verify.isEmpty({ a: 'a' }))
      .toBe(false);
    expect(Verify.isEmpty(['a', { a: ['v'] }]))
      .toBe(false);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  });
});

describe('Is not empty', () => {
  test('Is not empty should return only true', () => {
    expect(Verify.isNotEmpty(['a']))
      .toBe(true);
    expect(Verify.isNotEmpty({ a: 'a' }))
      .toBe(true);
    expect(Verify.isNotEmpty('asd'))
      .toBe(true);
    expect(spyIsNullOrUndefined)
      .toBeCalled()
  });

  test('Is not empty should return only false', () => {
    expect(Verify.isNotEmpty([]))
      .toBe(false);
    expect(Verify.isNotEmpty({}))
      .toBe(false);
    expect(Verify.isNotEmpty(123))
      .toBe(false);
    expect(Verify.isNotEmpty('       '))
      .toBe(false);
    expect(Verify.isNotEmpty(''))
      .toBe(false);
    expect(Verify.isNotEmpty(null))
      .toBe(false);
    expect(Verify.isNotEmpty(undefined))
      .toBe(false);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  })
});

describe('Is true', () => {
  test('Is true should return only true', () => {
    expect(Verify.isTrue(true))
      .toBe(true);
  });

  test('Is true should return only false', () => {
    expect(Verify.isTrue(false))
      .toBe(false);
    expect(Verify.isTrue('' as unknown as boolean))
      .toBe(false);
    expect(Verify.isTrue([] as unknown as boolean))
      .toBe(false);
    expect(Verify.isTrue({} as unknown as boolean))
      .toBe(false);
    expect(Verify.isTrue(null))
      .toBe(false);
    expect(Verify.isTrue(undefined))
      .toBe(false);
  });
});

describe('Is false', () => {
  test('Is false should return only true', () => {
    expect(Verify.isFalse(false))
      .toBe(true);
  });

  test('Is false should return only true', () => {
    expect(Verify.isFalse(null))
      .toBe(false);
    expect(Verify.isFalse(undefined))
      .toBe(false);
    expect(Verify.isFalse(true))
      .toBe(false);
    expect(Verify.isFalse([] as unknown as boolean))
      .toBe(false);
    expect(Verify.isFalse({} as unknown as boolean))
      .toBe(false);
    expect(Verify.isFalse('' as unknown as boolean))
      .toBe(false);
    expect(Verify.isFalse('asd' as unknown as boolean))
      .toBe(false);
    expect(Verify.isFalse(123 as unknown as boolean))
      .toBe(false);
  });
});

describe('Is number', () => {
  test('Is number should return only true', () => {
    expect(Verify.isNumber(1234))
      .toBe(true);
    expect(Verify.isNumber('1234'))
      .toBe(true);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  });

  test('Is number should return only false', () => {
    expect(Verify.isNumber('asd'))
      .toBe(false);
    expect(Verify.isNumber('as123'))
      .toBe(false);
    expect(Verify.isNumber('123as'))
      .toBe(false);
    expect(Verify.isNumber('as123as'))
      .toBe(false);
    expect(Verify.isNumber(null))
      .toBe(false);
    expect(Verify.isNumber(undefined))
      .toBe(false);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  });
});

describe('Is not number', () => {
  test('Is not number should return only true', () => {
    expect(Verify.isNotNumber('asd'))
      .toBe(true);
    expect(Verify.isNotNumber('as123'))
      .toBe(true);
    expect(Verify.isNotNumber('123as'))
      .toBe(true);
    expect(Verify.isNotNumber('as123as'))
      .toBe(true);
    expect(Verify.isNotNumber(null))
      .toBe(true);
    expect(Verify.isNotNumber(undefined))
      .toBe(true);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  });

  test('Is not number should return only false', () => {
    expect(Verify.isNotNumber(1234))
      .toBe(false);
    expect(Verify.isNotNumber('1234'))
      .toBe(false);
    expect(spyIsNullOrUndefined)
      .toBeCalled();
  });
});


const tpl = 'Strict compare of different types: {x} === {y}';
const throws = getThrows(tpl);
const msg = getMsgFn(tpl);

describe('strict compare', function () {

  describe('vars', function () {
    const f = getFn('x === y');
    it('throws for (number, string)', throws(f, 1, '1'));
    it('throws for (number, boolean)', throws(f, 1, true));
    it('throws for (number, null)', throws(f, 1, null));
    it('throws for (number, undefined)', throws(f, 1, undefined));
    it('throws for (number, array)', throws(f, 1, [1]));
    it('throws for (number, object)', throws(f, 1, {x: 1}));
    it('does not throw for (number, number)', doesNotThrow(f, 1, 1));
  });

  describe.skip('allowStrictCompareNull', function () {
    const f = getFn('x === y', {strictCompareNull: 'allow'});
    it('does not throw for (*, null)', doesNotThrow(f, 1, null));
    it('throws for not null', throws(f, 1, undefined));
  });

  describe.skip('allowStrictCompareUndefined', function () {
    const f = getFn('x === y', {strictCompareUndefined: 'allow'});
    it('does not throw for (*, undefined)', doesNotThrow(f, 1, undefined));
    it('throws for not undefined', throws(f, 1, null));
  });

  describe.skip('allowStrictCompareNull + allowStrictCompareUndefined', function () {
    const f = getFn('x === y', {
      strictCompareNull: 'allow',
      strictCompareUndefined: 'allow',
    });
    it('does not throw for (null, undefined)', doesNotThrow(f, null, undefined));
    it('does not throw for (*, null)', doesNotThrow(f, 1, null));
    it('does not throw for (*, undefined)', doesNotThrow(f, 1, undefined));
    it('throws for not null, undefined', throws(f, 1, '1'));
  });

  describe('functions / methods', function () {
    const f = getFn('x() === y.method()');
    it('throws for (function, method)', throws(f, () => '1', {method: () => 1}, msg('1', 1)));
  });

  describe('number', function () {
    const f = getFn('x === 1');
    it('throws for (string)', throws(f, '1', undefined, msg('1', 1)));
    it('does not throw for (number)', doesNotThrow(f, 1));
  });

  it('should keep result', function () {
    const f = getFn('x === y');
    assert.isTrue(f(1, 1));
    assert.isFalse(f(1, 2));
  });
});




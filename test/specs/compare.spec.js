
const tpl = 'Strict compare of different types: {x} === {y}';
const warn = getWarnFn(tpl);
const msg = getMsgFn(tpl);

describe('strict compare', function () {

  describe('vars', function () {
    const f = getFn('x === y');
    it('warns for (number, string)', warn(f, 1, '1'));
    it('warns for (number, boolean)', warn(f, 1, true));
    it('warns for (number, null)', warn(f, 1, null));
    it('warns for (number, undefined)', warn(f, 1, undefined));
    it('warns for (number, array)', warn(f, 1, [1]));
    it('warns for (number, object)', warn(f, 1, {x: 1}));
    it('does not warn for (number, number)', doesNotWarn(f, 1, 1));
  });

  describe.skip('allowStrictCompareNull', function () {
    const f = getFn('x === y', {strictCompareNull: 'allow'});
    it('does not warn for (*, null)', doesNotWarn(f, 1, null));
    it('warns for not null', warn(f, 1, undefined));
  });

  describe.skip('allowStrictCompareUndefined', function () {
    const f = getFn('x === y', {strictCompareUndefined: 'allow'});
    it('does not warn for (*, undefined)', doesNotWarn(f, 1, undefined));
    it('warns for not undefined', warn(f, 1, null));
  });

  describe.skip('allowStrictCompareNull + allowStrictCompareUndefined', function () {
    const f = getFn('x === y', {
      strictCompareNull: 'allow',
      strictCompareUndefined: 'allow',
    });
    it('does not warn for (null, undefined)', doesNotWarn(f, null, undefined));
    it('does not warn for (*, null)', doesNotWarn(f, 1, null));
    it('does not warn for (*, undefined)', doesNotWarn(f, 1, undefined));
    it('warns for not null, undefined', warn(f, 1, '1'));
  });

  describe('functions / methods', function () {
    const f = getFn('x() === y.method()');
    it('warns for (function, method)', warn(f, () => '1', {method: () => 1}, msg('1', 1)));
  });

  describe('number', function () {
    const f = getFn('x === 1');
    it('warns for (string)', warn(f, '1', undefined, msg('1', 1)));
    it('does not warn for (number)', doesNotWarn(f, 1));
  });

  it('should keep result', function () {
    const f = getFn('x === y');
    assert.isTrue(f(1, 1));
    assert.isFalse(f(1, 2));
  });
});




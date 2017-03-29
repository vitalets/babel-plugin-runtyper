
describe('plus', function () {
  describe('vars', function () {
    const warn = getWarnFn('Plus operation with different types: {x} + {y}');
    const f = getFn('x + y');
    it('warns for (number, string)', warn(f, 1, '1'));
    it('warns for (number, boolean)', warn(f, 1, true));
    it('warns for (number, null)', warn(f, 1, null));
    it('warns for (number, undefined)', warn(f, 1, undefined));
    it('warns for (number, array)', warn(f, 1, [1]));
    it('warns for (number, object)', warn(f, 1, {x: 1}));
    it('does not warn for (string, string)', doesNotWarn(f, '1', '1'));
    it('does not warn for (number, number)', doesNotWarn(f, 1, 1));
  });

  describe('allowStringNumberConcat', function () {
    const warn = getWarnFn('Plus operation should be used for numbers or strings: {x} + {y}');
    const f = getFn('x + y', {concatStringNumber: 'allow'});
    it('does not warn for (string, number)', doesNotWarn(f, '1', 1));
    it('warns for not (string, number)', warn(f, '1', undefined));
  });

  it('should keep result', function () {
    const f = getFn('x + y');
    assert.equal(f(1, 1), 2);
    assert.equal(f('1', '1'), '11');
  });
});


const warn = getWarnFn('Numeric operation with non-numeric value: {x} * {y}');

let f;

describe('numeric', function () {
  describe('vars', function () {
    before(() => f = getFn('x * y'));
    it('warns for (number, string)', () => warn(f, 1, '1'));
    it('warns for (number, boolean)', () => warn(f, 1, true));
    it('warns for (number, null)', () => warn(f, 1, null));
    it('warns for (number, undefined)', () => warn(f, 1, undefined));
    it('warns for (number, array)', () => warn(f, 1, [1]));
    it('warns for (number, object)', () => warn(f, 1, {x: 1}));
    it('warns for (number, NaN)', () => warn(f, 1, NaN));
    it('warns for (string, string)', () => warn(f, '1', '1'));
    it('does not warn for (number, number)', () => doesNotWarn(f, 1, 1));
  });

  describe('should not transform explicit values', function () {
    it('number * number', function () {
      f = getFn(`1 * 2`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn 1 * 2;\n}');
    });
  });

  it('should keep result', function () {
    const f = getFn('x * y');
    assert.equal(f(2, 3), 6);
  });
});

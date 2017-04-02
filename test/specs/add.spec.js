
const warn = getWarnFn('Add operation with different types: {x} + {y}');
let f;

describe('add', function () {

  describe('vars', function () {
    before(() => f = getFn('x + y'));
    it('warns for (number, string)', () => warn(f, 1, '1'));
    it('warns for (number, boolean)', () => warn(f, 1, true));
    it('warns for (number, null)', () => warn(f, 1, null));
    it('warns for (number, undefined)', () => warn(f, 1, undefined));
    it('warns for (number, array)', () => warn(f, 1, [1]));
    it('warns for (number, object)', () => warn(f, 1, {x: 1}));
    it('does not warn for (string, string)', () => doesNotWarn(f, '1', '1'));
    it('does not warn for (number, number)', () => doesNotWarn(f, 1, 1));
  });

  describe('option: implicitAddStringNumber = allow', function () {
    let warnStringNumber;
    before(() => {
      warnStringNumber = getWarnFn('Add operation should be used for numbers or strings: {x} + {y}');
      f = getFn('x + y', {implicitAddStringNumber: 'allow'});
    });
    it('does not warn for (string, number)', () => doesNotWarn(f, '1', 1));
    it('warns for not (string, number)', () => warnStringNumber(f, '1', undefined));
  });

  describe('option: explicitAddEmptyString', function () {

    it('does not warn when allowed', () => {
      f = getFn('x + ""', {explicitAddEmptyString: 'allow'});
      doesNotWarn(f, 1);
    });

    it('warns when not allowed', () => {
      f = getFn('x + ""', {explicitAddEmptyString: 'warn'});
      warn(f, 1, '');
    });

  });

  it('should keep result', function () {
    const f = getFn('x + y');
    assert.equal(f(1, 1), 2);
    assert.equal(f('1', '1'), '11');
  });

  describe('explicit values', function () {

    it('should not transform (string, string)', function () {
      f = getFn(`"1" + "2"`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn "1" + "2";\n}');
    });

    it('should not transform (number, number)', function () {
      f = getFn(`1 + 2`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn 1 + 2;\n}');
    });

    it('should not transform (number, string)', function () {
      f = getFn(`1 + "2"`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn 1 + "2";\n}');
    });

  });

});

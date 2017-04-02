
let f, warn;

describe('plus', function () {
  describe('vars', function () {
    before(() => {
      warn = getWarnFn('Plus operation with different types: {x} + {y}');
      f = getFn('x + y');
    });
    it('warns for (number, string)', () => warn(f, 1, '1'));
    it('warns for (number, boolean)', () => warn(f, 1, true));
    it('warns for (number, null)', () => warn(f, 1, null));
    it('warns for (number, undefined)', () => warn(f, 1, undefined));
    it('warns for (number, array)', () => warn(f, 1, [1]));
    it('warns for (number, object)', () => warn(f, 1, {x: 1}));
    it('does not warn for (string, string)', () => doesNotWarn(f, '1', '1'));
    it('does not warn for (number, number)', () => doesNotWarn(f, 1, 1));
  });

  describe('concatStringNumber: allow', function () {
    before(() => {
      warn = getWarnFn('Plus operation should be used for numbers or strings: {x} + {y}');
      f = getFn('x + y', {implicitAddStringNumber: 'allow'});
    });
    it('does not warn for (string, number)', () => doesNotWarn(f, '1', 1));
    it('warns for not (string, number)', () => warn(f, '1', undefined));
  });

  describe.skip('concatEmptyString: allow', function () {
    it('does not warn for *', () => {
      f = getFn('x + ""', {
        concatEmptyString: 'allow'
      });
      doesNotWarn(f, 1);
    });
  });

  it('should keep result', function () {
    const f = getFn('x + y');
    assert.equal(f(1, 1), 2);
    assert.equal(f('1', '1'), '11');
  });

  describe('should not transform explicit values', function () {
    it('string + string', function () {
      f = getFn(`"1" + "2"`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn "1" + "2";\n}');
    });
    it('number + number', function () {
      f = getFn(`1 + 2`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn 1 + 2;\n}');
    });
    it('number + string', function () {
      f = getFn(`1 + "2"`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn 1 + "2";\n}');
    });
  });
});

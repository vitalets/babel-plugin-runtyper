'use strict';

const warnTypes = getWarnFn('Add operation with different types: {x} + {y}');
const warnStringNumber = getWarnFn('Add operation should be used for numbers or strings: {x} + {y}');
let f;

describe('add', function () {

  describe('vars', function () {
    before(() => f = getFn('x + y'));
    it('warns for (number, string)', () => warnTypes(f, 1, '1'));
    it('warns for (number, boolean)', () => warnStringNumber(f, 1, true));
    it('warns for (number, null)', () => warnStringNumber(f, 1, null));
    it('warns for (number, undefined)', () => warnStringNumber(f, 1, undefined));
    it('warns for (number, array)', () => warnStringNumber(f, 1, [1]));
    it('warns for (number, object)', () => warnStringNumber(f, 1, {x: 1}));
    it('warns for (number, NaN)', () => warnStringNumber(f, 1, NaN));
    it('does not warn for (string, string)', () => doesNotWarn(f, '1', '1'));
    it('does not warn for (number, number)', () => doesNotWarn(f, 1, 1));
    it('does not warn for (String, string)', () => doesNotWarn(f, new String('1'), '1'));
    it('does not warn for (Number, number)', () => doesNotWarn(f, new Number(1), 1));
  });

  describe('3 operands', function () {
    it('warns for (number, string)', () => {
      f = getFn('x + 1 + y');
      warnTypes(f, 1, '1', 'Add operation with different types: 2 (number) + "1" (string)');
    });
    it('does not warn for (string, literal, string)', () => {
      f = getFn('x + "1" + y');
      doesNotWarn(f, '1', '1');
    });
  });

  describe('implicitAddStringNumber = allow', function () {
    before(() => f = getFn('x + y', {implicitAddStringNumber: 'allow'}));
    it('does not warn for (string, number)', () => doesNotWarn(f, '1', 1));
    it('warns for not (string, number)', () => warnStringNumber(f, '1', undefined));
  });

  describe('explicitAddEmptyString', function () {

    it('does not warn when allowed', () => {
      f = getFn('x + ""', {explicitAddEmptyString: 'allow'});
      doesNotWarn(f, 1);
    });

    it('warns when not allowed', () => {
      f = getFn('x + ""', {explicitAddEmptyString: 'deny'});
      warnTypes(f, 1, '');
    });

  });

  it('should keep result', function () {
    f = getFn('x + y');
    assert.equal(f(1, 1), 2);
    assert.equal(f('1', '1'), '11');
  });

  describe('explicit values', function () {

    it('should not transform (string, string)', function () {
      f = getFn(`"1" + "2"`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn "1" + "2";\n}');
    });

    it('should not transform (string, string, string)', function () {
      f = getFn(`"1" + "2" + "3"`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn "1" + "2" + "3";\n}');
    });

    it('should not transform (string, (string, string))', function () {
      f = getFn(`"1" + ("2" + "3")`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn "1" + ("2" + "3");\n}');
    });

    it('should not transform (string + number * number)', function () {
      f = getFn(`"1" + 2 * 1`);
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn "1" + 2 * 1;\n}');
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


const tpl = 'Relational operator should be used for two numbers or two strings: {x} > {y}';
const warn = getWarnFn(tpl);
const getMsg = getMsgFn(tpl);
let f;

describe('relational', function () {

  describe('2 vars', function () {
    before(() => f = getFn('x > y'));
    it('warns for (number, string)', () => warn(f, 1, '1'));
    it('warns for (number, boolean)', () => warn(f, 1, true));
    it('warns for (number, null)', () => warn(f, 1, null));
    it('warns for (number, undefined)', () => warn(f, 1, undefined));
    it('warns for (number, array)', () => warn(f, 1, [1]));
    it('warns for (number, object)', () => warn(f, 1, {x: 1}));
    it('warns for (number, NaN)', () => warn(f, 1, NaN));
    it('does not warn for (string, string)', () => doesNotWarn(f, '1', '1'));
    it('does not warn for (number, number)', () => doesNotWarn(f, 1, 1));
    it('does not warn for (String, string)', () => doesNotWarn(f, new String('1'), '1'));
    it('does not warn for (Number, number)', () => doesNotWarn(f, new Number(1), 1));
  });

  describe('1 var and literal', function () {
    before(() => f = getFn('x > 1'));
    it('warns for (string)', () => warn(f, '1', undefined, getMsg('1', 1)));
    it('does not warn for (number)', () => doesNotWarn(f, 1));
    it('does not warn for (Number)', () => doesNotWarn(f, new Number(1)));
  });

  it('should keep result', function () {
    f = getFn('x > y');
    assert.isTrue(f(1, 0));
    assert.isFalse(f(1, 2));
  });

  describe('explicit values', function () {

    it('should not transform (number, number)', function () {
      f = getFn('1 > 2');
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn 1 > 2;\n}');
    });

    it('should not transform (string, string)', function () {
      f = getFn('"1" < "2"');
      assert.equal(f.toString(), 'function anonymous(x,y\n/**/) {\nreturn "1" < "2";\n}');
    });

  });

});

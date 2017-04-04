
const tpl = 'Strict compare of different types: {x} === {y}';
const warn = getWarnFn(tpl);
const msg = getMsgFn(tpl);

let f;

describe('compare', function () {

  describe('2 vars', function () {
    before(() => f = getFn('x === y'));
    it('warns for (number, string)', () => warn(f, 1, '1'));
    it('warns for (number, boolean)', () => warn(f, 1, true));
    it('warns for (number, null)', () => warn(f, 1, null));
    it('warns for (number, undefined)', () => warn(f, 1, undefined));
    it('warns for (number, array)', () => warn(f, 1, [1]));
    it('warns for (number, object)', () => warn(f, 1, {x: 1}));
    it('warns for (number, Object.create(null))', () => {
      warn(f, 1, Object.create(null), 'Strict compare of different types: 1 (number) === {} (object)');
    });
    it('warns for (number, circullar obj)', () => {
      const y = {};
      y.x = y;
      warn(f, 1, y, 'Strict compare of different types: 1 (number) === [object Object] (object)');
    });
    it('warns for (number, Number)', () => warn(f, 1, new Number(1)));
    it('warns for (string, String)', () => warn(f, '1', new Number('1')));
    it('warns for (object, array)', () => warn(f, {x: 1}, [1]));
    it('warns for (object, date)', () => warn(f, {x: 1}, new Date()));
    it('warns for (object, regexp)', () => warn(f, {x: 1}, /1/));
    it('warns for (number, NaN)', () => warn(f, 1, NaN));
    it('warns for (number, function)', () => warn(f, 1, () => {}));
    it('warns for (instance A, object)', () => {
      function A() {}
      warn(f, new A(), {}, 'Strict compare of different types: {} (A) === {} (object)');
    });
    it('warns for (instance A, instance B)', () => {
      function A() {}
      function B() {}
      warn(f, new A(), new B(), 'Strict compare of different types: {} (A) === {} (B)');
    });
    it('does not warn for (number, number)', () => doesNotWarn(f, 1, 1));
    it('does not warn for (object, object)', () => doesNotWarn(f, {x: 1}, {x: 2}));
    it('does not warn for (object, Object.create(null))', () => doesNotWarn(f, {x: 1}, Object.create(null)));
    it('does not warn for (array, array)', () => doesNotWarn(f, [1], [1]));
    it('does not warn for (NaN, NaN)', () => doesNotWarn(f, NaN, NaN));
  });

  describe('composite expression', function () {
    before(() => f = getFn('x === 1 && x === y && y === 1'));
    it('warns for (number, string)', () => warn(f, 1, '1'));
  });


  describe('implicitCompareNull: allow', function () {
    before(() => f = getFn('x === y',  {
      implicitCompareNull: 'allow'
    }));
    it('does not warn for (null, *)', () => doesNotWarn(f, null, 1));
    it('warns for not null', () => warn(f, 1, undefined));
  });

  describe('implicitCompareUndefined: allow', function () {
    before(() => f = getFn('x === y', {
      implicitCompareUndefined: 'allow'
    }));
    it('does not warn for (*, undefined)', () => doesNotWarn(f, 1, undefined));
    it('warns for not undefined', () => warn(f, 1, null));
  });

  describe('implicitCompareNull: allow, implicitCompareUndefined: allow', function () {
    before(() => f = getFn('x === y', {
      implicitCompareNull: 'allow',
      implicitCompareUndefined: 'allow',
    }));
    it('does not warn for (null, undefined)', () => doesNotWarn(f, null, undefined));
    it('does not warn for (*, null)', () => doesNotWarn(f, 1, null));
    it('does not warn for (*, undefined)', () => doesNotWarn(f, 1, undefined));
    it('warns for not null, undefined', () => warn(f, 1, '1'));
  });

  describe('implicitCompareCustomTypes: allow', function () {
    before(() => f = getFn('x === y',  {
      implicitCompareCustomTypes: 'allow'
    }));
    it('does not warn for (instance A, object)', () => {
      function A() {}
      doesNotWarn(f, new A(), {});
    });
    it('does not warn for (instance A, instance B)', () => {
      function A() {}
      function B() {}
      doesNotWarn(f, new A(), new B());
    });
  });

  describe('explicitCompareTrue: allow', function () {
    it('does not warn for *', () => {
      f = getFn('x === true', {
        explicitCompareTrue: 'allow'
      });
      doesNotWarn(f, 1);
    });
  });

  describe('explicitCompareFalse: allow', function () {
    it('does not warn for *', () => {
      f = getFn('x === false', {
        explicitCompareFalse: 'allow'
      });
      doesNotWarn(f, 1);
    });
  });

  describe('expressions', function () {
    it('warns for (function, method)', () => {
      f = getFn('x() === y.method()');
      warn(f, () => '1', {method: () => 1}, msg('1', 1));
    });
    it('warns for (unary, member)', () => {
      f = getFn('typeof x === y.a');
      warn(f, '1', {a: 1}, msg('string', 1));
    });
  });

  describe('1 var and literal', function () {
    before(() => f = getFn('x === 1'));
    it('warns for (string)', () => warn(f, '1', undefined, msg('1', 1)));
    it('does not warn for (number)', () => doesNotWarn(f, 1));
  });

  it('should keep result', function () {
    f = getFn('x === y');
    assert.isTrue(f(1, 1));
    assert.isFalse(f(1, 2));
  });

});




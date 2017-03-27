
describe('strict compare', function () {

  describe('vars', function () {
    it('throws for (number, string)', function () {
      assert.throws(() => samples.equalVars(1, '1'), 'Strict compare of different types: 1 (number) === "1" (string)');
    });

    it('throws for (number, boolean)', function () {
      assert.throws(() => samples.equalVars(1, true), 'Strict compare of different types: 1 (number) === true (boolean)');
    });

    it('throws for (number, null)', function () {
      assert.throws(() => samples.equalVars(1, null), 'Strict compare of different types: 1 (number) === null');
    });

    it('throws for (number, undefined)', function () {
      assert.throws(() => samples.equalVars(1, undefined), 'Strict compare of different types: 1 (number) === undefined');
    });

    it('throws for (number, array)', function () {
      assert.throws(() => samples.equalVars(1, [1]), 'Strict compare of different types: 1 (number) === [1] (object)');
    });

    it('throws for (number, object)', function () {
      assert.throws(() => samples.equalVars(1, {x: 1}), 'Strict compare of different types: 1 (number) === {"x":1} (object)');
    });
  });

  describe('functions', function () {
    it('throws for (number, string)', function () {
      assert.throws(() => samples.equalFnMethod(() => '1', {method: () => 1}), 'Strict compare of different types: "1" (string) === 1 (number)');
    });
  });

  describe('number', function () {
    it('throws for (string)', function () {
      assert.throws(() => samples.equalNumber('1'), 'Strict compare of different types: "1" (string) === 1 (number)');
    });
  });

  it('should not throw and keep result', function () {
    assert.isTrue(samples.equalVars(1, 1));
    assert.isTrue(samples.equalFnMethod(() => 1, {method: () => 1}));
    assert.isFalse(samples.notEqualVars(1, 1));
  });
});





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

    it('throws for does not throw (number, number)', function () {
      assert.doesNotThrow(() => samples.notEqualVars(1, 1));
    });

    it('throws for does not throw (string, string)', function () {
      assert.doesNotThrow(() => samples.notEqualVars('1', '1'));
    });

  });

  describe('number', function () {

  });

  it('should keep result', function () {
    assert.isTrue(samples.equalVars(1, 1));
    assert.isFalse(samples.notEqualVars(1, 1));
  });
});




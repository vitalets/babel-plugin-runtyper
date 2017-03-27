describe('plus', function () {
  describe('vars', function () {
    it('throws for (number, string)', function () {
      assert.throws(() => samples.addVars(1, '1'), 'Plus operation with different types: 1 (number) + "1" (string)');
    });

    it('throws for (number, boolean)', function () {
      assert.throws(() => samples.addVars(1, true), 'Plus operation with different types: 1 (number) + true (boolean)');
    });

    it('throws for (number, null)', function () {
      assert.throws(() => samples.addVars(1, null), 'Plus operation with different types: 1 (number) + null');
    });

    it('throws for (number, undefined)', function () {
      assert.throws(() => samples.addVars(1, undefined), 'Plus operation with different types: 1 (number) + undefined');
    });
  });

  it('should keep result', function () {
    assert.equal(samples.addVars(1, 1), 2);
    assert.equal(samples.addVars('1', '1'), '11');
  });
});

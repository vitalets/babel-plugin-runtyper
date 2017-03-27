describe('numeric', function () {
  describe('vars', function () {
    it('throws for (number, string)', function () {
      assert.throws(() => samples.multiplyVars(1, '1'), 'Numeric operation with non-numeric value: 1 (number) * "1" (string)');
    });

    it('throws for (string, string)', function () {
      assert.throws(() => samples.multiplyVars('1', '1'), 'Numeric operation with non-numeric value: "1" (string) * "1" (string)');
    });
  });

  it('should keep result', function () {
    assert.equal(samples.multiplyVars(2, 2), 4);
  });
});

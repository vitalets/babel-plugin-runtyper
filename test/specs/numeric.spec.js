
const tpl = 'Numeric operation with non-numeric value: {x} * {y}';
const throws = getThrows(tpl);

describe('numeric', function () {
  describe('vars', function () {
    const f = getFn('x * y');
    it('throws for (number, string)', throws(f, 1, '1'));
    it('throws for (number, boolean)', throws(f, 1, true));
    it('throws for (number, null)', throws(f, 1, null));
    it('throws for (number, undefined)', throws(f, 1, undefined));
    it('throws for (number, array)', throws(f, 1, [1]));
    it('throws for (number, object)', throws(f, 1, {x: 1}));
    it('throws for (string, string)', throws(f, '1', '1'));
    it('does not throw for (number, number)', doesNotThrow(f, 1, 1));
  });

  it('should keep result', function () {
    const f = getFn('x * y');
    assert.equal(f(2, 3), 6);
  });
});

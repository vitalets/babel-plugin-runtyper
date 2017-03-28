
const tplNS = 'Plus operation should be used for numbers or strings: {x} + {y}';
const tplDT = 'Plus operation with different types: {x} + {y}';
const throwsNS = getThrows(tplNS);
const throwsDT = getThrows(tplDT);

describe('plus', function () {
  describe('vars', function () {
    const f = getFn('x + y');
    it('throws for (number, string)', throwsDT(f, 1, '1'));
    it('throws for (number, boolean)', throwsNS(f, 1, true));
    it('throws for (number, null)', throwsNS(f, 1, null));
    it('throws for (number, undefined)', throwsNS(f, 1, undefined));
    it('throws for (number, array)', throwsNS(f, 1, [1]));
    it('throws for (number, object)', throwsNS(f, 1, {x: 1}));
    it('does not throw for (string, string)', doesNotThrow(f, '1', '1'));
    it('does not throw for (number, number)', doesNotThrow(f, 1, 1));
  });

  it('should keep result', function () {
    const f = getFn('x + y');
    assert.equal(f(1, 1), 2);
    assert.equal(f('1', '1'), '11');
  });
});

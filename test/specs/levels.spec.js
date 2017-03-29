
const msg = 'Plus operation with different types: 1 (number) + "1" (string)';

describe('levels', function () {
  describe('default level', function () {
    it('warn', function () {
      const f = getFn('1 + "1"', {defaultLevel: 'warn'});
      const spy = consoleSpy('warn');
      f();
      assert.equal(spy.getMessage(), msg);
    });

    it('error', function () {
      const f = getFn('1 + "1"', {defaultLevel: 'error'});
      const spy = consoleSpy('error');
      f();
      assert.equal(spy.getMessage(), msg);
    });

    it('break', function () {
      const f = getFn('1 + "1"', {defaultLevel: 'break'});
      assert.throws(f, msg);
    });

    it('allow', function () {
      const f = getFn('1 + "1"', {defaultLevel: 'allow'});
      const spyWarn = consoleSpy('warn');
      const spyError = consoleSpy('error');
      f();
      assert.equal(spyWarn.getMessage(), '');
      assert.equal(spyError.getMessage(), '');
    });
  });

  describe('custom option level', function () {
    it('warn', function () {
      const f = getFn('1 + "1"', {concatStringNumber: 'warn'});
      const spy = consoleSpy('warn');
      f();
      assert.equal(spy.getMessage(), msg);
    });

    it('error', function () {
      const f = getFn('1 + "1"', {concatStringNumber: 'error'});
      const spy = consoleSpy('error');
      f();
      assert.equal(spy.getMessage(), msg);
    });

    it('break', function () {
      const f = getFn('1 + "1"', {concatStringNumber: 'break'});
      assert.throws(f, msg);
    });

    it('allow', function () {
      const f = getFn('1 + "1"', {concatStringNumber: 'allow'});
      const spyWarn = consoleSpy('warn');
      const spyError = consoleSpy('error');
      f();
      assert.equal(spyWarn.getMessage(), '');
      assert.equal(spyError.getMessage(), '');
    });
  });
});

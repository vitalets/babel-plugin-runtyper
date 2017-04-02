
const msg = 'Add operation with different types: "1" (string) + 1 (number)';

describe('levels', function () {
  describe('default level', function () {

    it('info', function () {
      const f = getFn('x + 1', {defaultLevel: 'info'});
      const spy = consoleSpy('info');
      f('1');
      assert.equal(spy.getMessage(), msg);
    });

    it('warn', function () {
      const f = getFn('x + 1', {defaultLevel: 'warn'});
      const spy = consoleSpy('warn');
      f('1');
      assert.equal(spy.getMessage(), msg);
    });

    it('error', function () {
      const f = getFn('x + 1', {defaultLevel: 'error'});
      const spy = consoleSpy('error');
      f('1');
      assert.equal(spy.getMessage(), msg);
    });

    it('break', function () {
      const f = getFn('x + 1', {defaultLevel: 'break'});
      assert.throws(() => f('1'), msg);
    });

    it('allow', function () {
      const f = getFn('x + 1', {defaultLevel: 'allow'});
      const spyWarn = consoleSpy('warn');
      const spyError = consoleSpy('error');
      f('1');
      assert.equal(spyWarn.getMessage(), '');
      assert.equal(spyError.getMessage(), '');
    });
  });

  describe('custom option level', function () {
    it('warn', function () {
      const f = getFn('x + 1', {implicitAddStringNumber: 'warn'});
      const spy = consoleSpy('warn');
      f('1');
      assert.equal(spy.getMessage(), msg);
    });

    it('error', function () {
      const f = getFn('x + 1', {implicitAddStringNumber: 'error'});
      const spy = consoleSpy('error');
      f('1');
      assert.equal(spy.getMessage(), msg);
    });

    it('break', function () {
      const f = getFn('x + 1', {implicitAddStringNumber: 'break'});
      assert.throws(() => f('1'), msg);
    });

    it('allow', function () {
      const f = getFn('x + 1', {implicitAddStringNumber: 'allow'});
      const spyWarn = consoleSpy('warn');
      const spyError = consoleSpy('error');
      f('1');
      assert.equal(spyWarn.getMessage(), '');
      assert.equal(spyError.getMessage(), '');
    });
  });
});

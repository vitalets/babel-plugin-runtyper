/**
 * Common options checks.
 * Specific options are checked in corresponding specs.
 */

'use strict';

describe('options', function () {

  let f, spy;

  it('should not throw on correct values', function () {
    f = () => getFn('x === 1', {
      enabled: true,
      warnLevel: 'error',
      implicitAddStringNumber: 'allow',
      implicitEqualNull: 'deny',
    });
    assert.doesNotThrow(f);
  });

  describe('common checks', function () {
    it('should throw on incorrect option name', function () {
      f = () => getFn('x === 1', {abc: 1});
      assert.throws(f, /Unknown Runtyper option name: abc/);
    });

    it('should throw on incorrect option type', function () {
      f = () => getFn('x === 1', {enabled: 'true'});
      assert.throws(f, /Incorrect Runtyper option type: enabled true \(string\)/);
    });
  });

  describe('warnLevel', function () {
    it('should throw on incorrect value', function () {
      f = () => getFn('x === 1', {warnLevel: 'abc'});
      assert.throws(f, /Incorrect Runtyper option value: warnLevel = abc, possible values: info,warn,error,break/);
    });

    it('info', function () {
      f = getFn('x + 1', {warnLevel: 'info'});
      spy = consoleSpy('info');
      f('1');
      assert.equal(spy.getMessage(), 'Add operation with different types: "1" (string) + 1 (number)');
    });

    it('warn', function () {
      f = getFn('x + 1', {warnLevel: 'warn'});
      spy = consoleSpy('warn');
      f('1');
      assert.equal(spy.getMessage(), 'Add operation with different types: "1" (string) + 1 (number)');
    });

    it('error', function () {
      f = getFn('x + 1', {warnLevel: 'error'});
      spy = consoleSpy('error');
      f('1');
      assert.equal(spy.getMessage(), 'Add operation with different types: "1" (string) + 1 (number)');
    });

    it('break', function () {
      f = getFn('x + 1', {warnLevel: 'break'});
      assert.throws(() => f('1'), /Add operation with different types: "1" \(string\) \+ 1 \(number\)/);
    });
  });

  describe('allow / deny', function () {
    it('allow', function () {
      f = getFn('x + 1', {implicitAddStringNumber: 'allow'});
      spy = consoleSpy('warn');
      f('1');
      assert.equal(spy.getMessage(), '');
    });

    it('deny', function () {
      f = getFn('x + 1', {implicitAddStringNumber: 'deny'});
      spy = consoleSpy('warn');
      f('1');
      assert.equal(spy.getMessage(), 'Add operation with different types: "1" (string) + 1 (number)');
    });
  });

});

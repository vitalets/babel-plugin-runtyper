'use strict';

describe('options', function () {

  const msg = 'Add operation with different types: "1" (string) + 1 (number)';
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
      assert.equal(spy.getMessage(), msg);
    });

    it('warn', function () {
      f = getFn('x + 1', {warnLevel: 'warn'});
      spy = consoleSpy('warn');
      f('1');
      assert.equal(spy.getMessage(), msg);
    });

    it('error', function () {
      f = getFn('x + 1', {warnLevel: 'error'});
      spy = consoleSpy('error');
      f('1');
      assert.equal(spy.getMessage(), msg);
    });

    it('break', function () {
      f = getFn('x + 1', {warnLevel: 'break'});
      assert.throws(() => f('1'), msg);
    });
  });

  describe('rules', function () {

    it('should throw on incorrect value', function () {
      f = () => getFn('x === 1', {implicitAddStringNumber: 'abc'});
      assert.throws(f, /Incorrect Runtyper option value: implicitAddStringNumber = abc, possible values: allow,deny/);
    });

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
      assert.equal(spy.getMessage(), msg);
    });

  });

});

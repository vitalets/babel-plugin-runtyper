/**
 * Common options checks.
 * Specific options are checked in corresponding specs.
 */

'use strict';

describe('options', function () {

  let f, spy;
  const equalTempale = 'Strict equal of different types: {x} === {y}';
  const warnEqual = getWarnFn(equalTempale);

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

  describe('one operator in excludeOperators', function () {
    it('does not warn for (null, number)', () => {
      f = getFn('x === y',  { excludeOperators: ['equal']});
      return doesNotWarn(f, null, 1);
    });

    it('does not warn for (number, undefined)', () => {
      f = getFn('x * y',  { excludeOperators: ['numeric']});
      return doesNotWarn(f, 1, undefined);
    });

    it('does not warn for (string, number)', () => {
      f = getFn('x + y',  { excludeOperators: ['add']});
      return doesNotWarn(f, 'hello', 3);
    });

    it('does not warn for (undefined, undefined)', () => {
      f = getFn('x >= y',  { excludeOperators: ['relational']});
      return doesNotWarn(f, undefined, undefined);
    });
  });

  describe('mixed excludeOperators', function () {
    it('does not warn for (null, number)', () => {
      f = getFn('x >= y',  { excludeOperators: ['add', 'relational'] });
      return doesNotWarn(f, null, 1);
    });

    it('does not warn for (null, string)', () => {
      f = getFn('x === y',  { excludeOperators: ['equal', 'numeric'] });
      return doesNotWarn(f, null, 'hello');
    });

    it('does not warn for (undefined, number)', () => {
      f = getFn('x === y',  { excludeOperators: ['add', 'relational', 'numeric', 'equal'] });
      return doesNotWarn(f, undefined, 1);
    });

    it('does warn for (undefined, null)', () => {
      f = getFn('x === y',  { excludeOperators: [] });
      return warnEqual(f, undefined, null, 'Strict equal of different types: undefined === null');
    });
  });
});

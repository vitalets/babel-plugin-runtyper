
let f;

describe('options', function () {

  it('should throw on incorrect option name', function () {
    f = () => getFn('x === 1', {abc: 1});
    assert.throws(f, 'AssertionError: unknown: Unknown Runtyper option name: abc');
  });

  it('should throw on incorrect option type', function () {
    f = () => getFn('x === 1', {enabled: 'true'});
    assert.throws(f, 'AssertionError: unknown: Incorrect Runtyper option type: enabled true (string)');
  });

  it('should throw on incorrect level', function () {
    f = () => getFn('x === 1', {defaultLevel: 'abc'});
    assert.throws(f, 'AssertionError: unknown: Incorrect Runtyper level value: defaultLevel = abc');
  });

  it('should not throw on correct values', function () {
    f = () => getFn('x === 1', {
      enabled: true,
      defaultLevel: 'error',
      concatStringNumber: 'allow',
      implicitCompareNull: 'break',
    });
    assert.doesNotThrow(f);
  });

});

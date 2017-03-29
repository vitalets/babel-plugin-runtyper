describe('options', function () {
  it('should throw on incorrect option name', function () {
    assert.throws(() => getFn('1 === 1', {abc: 1}),
      'AssertionError: unknown: Unknown Runtyper option name: abc'
    );
  });
  it('should throw on incorrect option type', function () {
    assert.throws(() => getFn('1 === 1', {enabled: 'true'}),
      'AssertionError: unknown: Incorrect Runtyper option type: enabled true (string)'
    );
  });
  it('should throw on incorrect level', function () {
    assert.throws(() => getFn('1 === 1', {defaultLevel: 'abc'}),
      'AssertionError: unknown: Incorrect Runtyper level value: defaultLevel = abc'
    );
  });
  it('should not throw on correct values', function () {
    assert.doesNotThrow(() => getFn('1 === 1', {
      enabled: true,
      defaultLevel: 'error',
      concatStringNumber: 'allow',
      strictCompareNull: 'break',
    }));
  });
});

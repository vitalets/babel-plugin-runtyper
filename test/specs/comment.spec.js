
let f;

describe('comment', function () {

  describe('1 line', function () {
    it('should disable for 2 operands', function () {
      f = getFn(`x + y // runtyper-disable-line`);
      assert.notInclude(f.toString(), 'Add');
    });

    it('should disable for 3 operands', function () {
      f = getFn(`x + y + 1 // runtyper-disable-line`);
      assert.notInclude(f.toString(), 'Add');
    });

    it('should disable for 4 operands', function () {
      f = getFn(`1 + x + y + 1 // runtyper-disable-line`);
      assert.notInclude(f.toString(), 'Add');
    });

    it('should disable by inner comment with brackets', function () {
      f = getFn(`(
          x + y + 1 // runtyper-disable-line
        )
      `);
      assert.notInclude(f.toString(), 'Add');
    });

    it('should not disable by incorrect comment', function () {
      f = getFn(`x + y + 1 // blabla runtyper-disable-line`);
      assert.include(f.toString(), 'Add');
    });

    it('should not disable by empty comment', function () {
      f = getFn(`x + y + 1 // `);
      assert.include(f.toString(), 'Add');
    });
  });

  describe('2 lines', function () {
    it('should disable by top comment', function () {
      f = getFn(`
       x + // runtyper-disable-line
       y 
      `);
      assert.notInclude(f.toString(), 'Add');
    });

    it('should disable by bottom comment', function () {
      f = getFn(`
       x + 
       y // runtyper-disable-line
      `);
      assert.notInclude(f.toString(), 'Add');
    });

  });

  describe('3 lines', function () {

    it('should disable by top comment', function () {
      f = getFn(`
        x // runtyper-disable-line
        + 
        y
      `);
      assert.notInclude(f.toString(), 'Add');
    });

    it('should disable by middle comment', function () {
      f = getFn(`
        x 
        + // runtyper-disable-line
        y
      `);
      assert.notInclude(f.toString(), 'Add');
    });

    it('should disable by bottom comment', function () {
      f = getFn(`
        x 
        + 
        y // runtyper-disable-line
      `);
      assert.notInclude(f.toString(), 'Add');
    });

    it('should disable by middle comment #2', function () {
      f = getFn(`
        x + 
        y + // runtyper-disable-line
        1
      `);
      assert.notInclude(f.toString(), 'Add');
    });

    it('should disable by middle comment #3', function () {
      f = getFn(`
        x + 
        (y + 1) // runtyper-disable-line
        1
      `);
      assert.notInclude(f.toString(), 'Add');
    });

  });

});

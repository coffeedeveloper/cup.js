describe('localStorage support check', function() {

  it('Modern bowser', function() {
    expect(true).toBe(cup.support.localStorage);
  });

});

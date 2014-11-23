describe('cookie check', function() {

  it('cookie set', function() {
    expect('test=hello').toEqual(cup.cookie.set('test', 'hello'));
  });

  // it('cookie get', function() {
  //   var a = 'hello'
  //   expect(a).toEqual(cup.cookie.get('test'));
  // });

});

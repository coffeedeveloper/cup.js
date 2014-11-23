describe('array variable check', function() {
  var input;

  it('null should be is not array', function() {
    input = null;
    expect(false).toBe(cup.is.arr(input));
    expect(false).toBe(cup.isArray(input));
  });

  it('undefined should be is not array', function() {
    input = undefined;
    expect(false).toBe(cup.is.arr(input));
    expect(false).toBe(cup.isArray(input));
  });

  it('[] should be is array', function() {
    input = [];
    expect(true).toBe(cup.is.arr(input));
    expect(true).toBe(cup.isArray(input));
  });

  it('object should be is not array', function() {
    input = {};
    expect(false).toBe(cup.is.arr(input));
    expect(false).toBe(cup.isArray(input));
  });

});

describe('function variable check', function () {

  var input;

  it('null should be is not function', function() {
    input = null;
    expect(false).toBe(cup.is.func(input));
    expect(false).toBe(cup.isFunction(input));
  });

  it('undefined should be is not function', function() {
    input = undefined;
    expect(false).toBe(cup.is.func(input));
    expect(false).toBe(cup.isFunction(input));
  });

  it('cup.noop should be is function', function() {
    input = cup.noop;
    expect(true).toBe(cup.is.func(input));
    expect(true).toBe(cup.isFunction(input));
  });

  it('function should be is function', function() {
    input = function () {
      var a = null;
    };
    expect(true).toBe(cup.is.func(input));
    expect(true).toBe(cup.isFunction(input));
  });

});

describe('string variable check', function () {
  var input;

  it('null should be is not string', function() {
    input = null;
    expect(false).toBe(cup.is.str(input));
    expect(false).toBe(cup.isString(input));
  });

  it('undefined should be is not string', function() {
    input = undefined;
    expect(false).toBe(cup.is.str(input));
    expect(false).toBe(cup.isString(input));
  });

  it('empty string should be is string', function() {
    input = '';
    expect(true).toBe(cup.is.str(input));
    expect(true).toBe(cup.isString(input));
  });

  it('number should be is not string', function() {
    input = 12;
    expect(false).toBe(cup.is.str(input));
    expect(false).toBe(cup.isString(input));
  });

});

describe('object variable check', function () {
  var input;

  it('null should be is not object', function() {
    input = null;
    expect(false).toBe(cup.is.obj(input));
    expect(false).toBe(cup.isObject(input));
  });

  it('undefined should be is not object', function() {
    input = undefined;
    expect(false).toBe(cup.is.obj(input));
    expect(false).toBe(cup.isObject(input));
  });

  it('empty object should be is object', function() {
    input = {};
    expect(true).toBe(cup.is.obj(input));
    expect(true).toBe(cup.isObject(input));
  });

  it('array should be is not object', function() {
    input = [];
    expect(false).toBe(cup.is.obj(input));
    expect(false).toBe(cup.isObject(input));
  });

  it('regexp should be is not object', function() {
    input = /d+/;
    expect(false).toBe(cup.is.obj(input));
    expect(false).toBe(cup.isObject(input));
  });
});

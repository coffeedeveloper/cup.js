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

describe('number variable check', function () {
  var input;

  it('null should be is not number', function() {
    input = null;
    expect(false).toBe(cup.is.num(input));
    expect(false).toBe(cup.isNumber(input));
  });

  it('undefined should be is not number', function() {
    input = undefined;
    expect(false).toBe(cup.is.num(input));
    expect(false).toBe(cup.isNumber(input));
  });

  it('"123" should be is not number', function() {
    input = "123";
    expect(false).toBe(cup.is.num(input));
    expect(false).toBe(cup.isNumber(input));
  });

  it('123 should be is number', function() {
    input = 123;
    expect(true).toBe(cup.is.num(input));
    expect(true).toBe(cup.isNumber(input));
  });
});


describe('bool variable check', function () {
  var input;

  it('"true" should be is not bool', function() {
    input = "true";
    expect(false).toBe(cup.is.bool(input));
    expect(false).toBe(cup.isBoolean(input));
  });

  it('true should be is bool', function() {
    input = true;
    expect(true).toBe(cup.is.bool(input));
    expect(true).toBe(cup.isBoolean(input));
  });

  it('false should be is bool', function() {
    input = false;
    expect(true).toBe(cup.is.bool(input));
    expect(true).toBe(cup.isBoolean(input));
  });
});

describe('null variable check', function () {
  var input;

  it('null should be is null', function() {
    input = null;
    expect(true).toBe(cup.is.nil(input));
    expect(true).toBe(cup.isNull(input));
  });

  it('undefined should be is not null', function() {
    input = undefined;
    expect(false).toBe(cup.is.nil(input));
    expect(false).toBe(cup.isNull(input));
  });

});

describe('undefined variable check', function () {
  var input;

  it('undefined should be is undefined', function() {
    input = undefined;
    expect(true).toBe(cup.is.undef(input));
    expect(true).toBe(cup.isUndefined(input));
  });

  it('null should be is not undefined', function() {
    input = null;
    expect(false).toBe(cup.is.undef(input));
    expect(false).toBe(cup.isUndefined(input));
  });

});

describe('empty variable check', function () {
  var input;

  it('undefined should be is empty', function() {
    input = undefined;
    expect(true).toBe(cup.is.empty(input));
    expect(true).toBe(cup.isEmpty(input));
  });

  it('null should be is empty', function() {
    input = null;
    expect(true).toBe(cup.is.empty(input));
    expect(true).toBe(cup.isEmpty(input));
  });

  it('[] should be is empty', function() {
    input = [];
    expect(true).toBe(cup.is.empty(input));
    expect(true).toBe(cup.isEmpty(input));
  });

  it('{} should be is empty', function() {
    input = {};
    expect(true).toBe(cup.is.empty(input));
    expect(true).toBe(cup.isEmpty(input));
  });

  it('"" should be is empty', function() {
    input = "";
    expect(true).toBe(cup.is.empty(input));
    expect(true).toBe(cup.isEmpty(input));
  });
});

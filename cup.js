;(function () {
  var root = this;

  var cup = function (obj) {
    if (obj instanceof cup) return obj;
    if (!(this instanceof cup)) return new cup(obj);
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = cup;
    }
    exports.cup = cup;
  } else {
    root.cup = cup;
  }

  cup.version = '1.3.1';

  cup.noop = function () { };

  cup.cl = {};

  cup.cl.log = function (msg) {
    if ('console' in root) root.console.log(msg);
  };

  cup.cl.err = function (msg) {
    if ('console' in root) root.console.error(msg);
  };

  cup.cl.warn = function (msg) {
    if ('console' in root) root.console.warn(msg);
  };

  cup.proto = {};

  cup.proto.obj = Object.prototype;

  cup.proto.str = String.prototype;

  cup.proto.arr = Array.prototype;

  cup.proto.func = Function.prototype;

  cup.support = {};

  cup.support.localStorage = (function() {
    return 'localStorage' in root;
  })();

  cup.reg = {};

  cup.regEscape = cup.reg.escape = function (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  cup.regIP = cup.reg.ip = /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/;

  cup.regEmail = cup.reg.email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  cup.regNum = cup.reg.num = /^[-+]?[\d]+.?\d*$/;

  cup.is = {};

  cup.isType = cup.is.type = function (o, t) {
    return cup.proto.obj.toString.call(o) === '[object ' + t + ']';
  };

  cup.isObject = cup.is.obj = function (obj) {
    return cup.is.type(obj, 'Object') && !!obj;
  };

  cup.isReg = cup.is.reg = function (obj) {
    return cup.is.type(obj, 'RegExp');
  };

  cup.isNumber = cup.is.num = function (obj) {
    return cup.is.type(obj, 'Number');
  };

  cup.isBoolean = cup.is.bool = function (obj) {
    return cup.is.type(obj, 'Boolean');
  };

  cup.isFunction = cup.is.func = function (obj) {
    return cup.is.type(obj, 'Function');
  };

  cup.isString = cup.is.str = function (obj) {
    return cup.is.type(obj, 'String');
  };

  cup.isArray = cup.is.arr = function (obj) {
    return 'isArray' in Array ? Array.isArray(obj)
          : cup.is.type(obj, 'Array');
  };

  cup.isDate = cup.is.date = function (obj) {
    return cup.is.type(obj, 'Date');
  };

  cup.isNull = cup.is.nil = function (obj) {
    return cup.is.type(obj, 'Null');
  };

  cup.isUndefined = cup.is.undef = function (obj) {
    return cup.is.type(obj, 'Undefined');
  };

  cup.isEmpty = cup.is.empty = function (obj) {
    if(cup.is.nil(obj) || cup.is.undef(obj)) return true;
    if(cup.is.arr(obj) || cup.is.str(obj)) return obj.length === 0;
    if(cup.is.ele(obj) || cup.is.num(obj)) return false;
    if(cup.is.obj(obj))
      for(var p in obj)
        if(cup.obj.has(obj, p))
          return false;
    return true;
  };

  cup.isElement = cup.is.ele = function (obj) {
    return typeof obj === 'object' && obj.nodeType === 1;
  };

  cup.isLink = cup.is.link = function (link) {
    try {
      var a = document.createElement('a');
      a.href = link;
      return a.href ? true : false;
    } catch (e) {
      return false;
    }
  };

  cup.isIP = cup.is.ip = function (ip) {
    return cup.reg.ip.test(ip);
  };

  cup.isEmail = cup.is.email = function (email) {
    return cup.reg.email.test(email);
  };

  cup.isMobile = cup.is.mobile = function () {
    var result = false;
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent) ||
    window.location.href.indexOf("?mobile") != -1 ||
    /Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      result = true;
    }
    return result;
  };

  cup.isJson = cup.is.json = function (text) {
    if (cup.is.str(text))
      return !cup.is.undef(cup.json.parse(text));
    return false;
  };

  cup.isIE = cup.is.ie = function () {
    var ua = navigator.userAgent.toLowerCase();
    return (cup.str.cons(ua, 'msie') && !cup.str.cons(ua, 'opera')) ||
      (!cup.str.cons(ua, 'msie') && cup.str.cons(ua, 'trident'));
  };

  cup.obj = {};

  cup.has = cup.obj.has = function (obj, key) {
    return !cup.is.nil(obj) && cup.proto.obj.hasOwnProperty.call(obj, key);
  };

  cup.extend = cup.obj.extend = function (obj) {
    cup.each(arguments, function (d, i) {
      if (i !== 0)
        for (var p in d)
          obj[p] = d[p];
    });
  };

  cup.include = cup.obj.include = function (obj) {
    cup.each(arguments, function (d, i) {
      if (i !== 0)
        for (var p in d)
          obj.prototype[p] = d[p];
    });
  };

  cup.setParent = cup.obj.parent = function (obj) {
    for (var o in obj) {
      if (o !== '_parent' && obj[o]) {
        obj[o]._parent = obj;
        if (cup.is.obj(obj[o])) {
          cup.obj.parent(obj[o]);
        }
      }
    }
  };

  cup.conv = {};

  cup.conv.str = function (obj) {
    return String(obj);
  };

  cup.conv.num = cup.conv.int = function (obj, radix, defval) {
    radix = cup.is.empty(radix) ? 10 : radix;
    return cup.reg.num.test(obj) ? parseInt(obj, radix) : defval;
  };

  cup.conv.float = function (obj, defval) {
    return cup.reg.num.test(obj) ? parseFloat(obj) : defval;
  };

  cup.date = {};

  cup.date.str = function (date, str) {
    var year    = date.getFullYear();
    var month   = cup.digital.fix(date.getMonth() + 1);
    var day     = cup.digital.fix(date.getDate());
    var hour    = cup.digital.fix(date.getHours());
    var miniute = cup.digital.fix(date.getMinutes());
    var second  = cup.digital.fix(date.getSeconds());

    return str.replace('yyyy', year)
              .replace('MM', month)
              .replace('dd', day)
              .replace('hh', hour)
              .replace('mm', miniute)
              .replace('ss', second);
  };

  cup.digital = {};

  cup.digital.fix = function (n) {
    return n < 10 ? '0' + n : n;
  };

  cup.digital.at = function (n, i) {
    var s = cup.conv.str(n);
    return s.charAt(s.length - 1 - i);
  };

  cup.str = {};

  cup.trim = cup.str.trim = function (str, trim) {
    if (!trim && 'trim' in cup.proto.str) {
      return cup.proto.str.trim.call(str);
    }

    var whitespace = trim || ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';

    for (var i = 0, len = str.length; i < len; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }

    for (i = str.length - 1; i >= 0; i--) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }

    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
  };

  cup.str.cons = function (str, sub) {
    if ('contains' in cup.proto.str)
      return str.contains(sub);
    return str.indexOf(sub) > -1;
  };

  cup.round = function (num, fix, isTrim) {
    var r = parseFloat(num);
    if (fix) {
      r = r.toFixed(fix);
    }
    if (isTrim) {
      if (parseInt(r) == r) {
        r = parseInt(r);
      }
    }
    return r;
  };

  cup.random = function (min, max) {
    if (cup.is.empty(max)) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  cup.each = function (eles, callback) {
    if (cup.is.nil(eles) || cup.is.undef(eles)) return eles;
    if (!cup.is.func(callback)) return eles;

    var i, len = eles.length, r;
    if (cup.is.num(len)) {
      for (i = 0; i < len; i++) {
        r = callback(eles[i], i, eles);
        if (r === false)
          break;
      }
    } else {
      for (var e in eles) {
        r = callback(eles[e], e, eles);
        if (r === false)
          break;
      }
    }
    return eles;
  };

  cup.json = {};

  cup.jsonParse = cup.json.parse = function (str) {
    if (cup.is.str(str)) {
      try {
        if ('JSON' in root || JSON)
          return JSON.parse(str);
        else
          return eval('(' + str + ')');
      } catch (e) {
        cup.cl.err('data: ' + str + '\n' + 'message: ' + e);
      }
    } else {
      if (cup.is.obj(str) || cup.is.arr(str))
        return str;
      return null;
    }
  };

  cup.jsonStringify = cup.json.stringify = function (json) {
    return root.JSON.stringify(json);
  };

  cup.url = {};

  cup.decodeUrl = cup.url.decode = function (url) {
    if ('decodeURIComponent' in root)
      return decodeURIComponent(url);
    return unescape(url);
  };

  cup.encodeUrl = cup.url.encode = function (url) {
    if ('encodeURIComponent' in root)
      return encodeURIComponent(url);
    return escape(url);
  };

  cup.getFullUrl = cup.url.full = function (url) {
    if (!cup.is.str(url))
      return url;
    return url.indexOf('http://') !== 0 ? 'http://' + url : url;
  };

  cup.getUrlHost = cup.url.host = function (url) {
    var host = '';

    if (!cup.is.str(url))
      return host;

    var getHost = function (val) {
      if (val.indexOf('http://') === 0)
        val = val.replace('http://', '');
      var arr = ['/', '?', ':'];
      for(var i = 0; i < arr.length; i++) {
        var _i = val.indexOf(arr[i]);
        if (_i > -1)
          val = val.substr(0, _i);
      }
      return val;
    };

    try {
      if ('URL' in root && 'host' in URL)
        host = (new URL(url)).host;
      else
        host = getHost(url);
    } catch (e) {
      host = getHost(url);
    }

    return host;
  };

  cup.base64 = {};

  cup.base64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  cup.base64._utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = '';

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  };

  cup.base64._utf8_decode = function (utftext) {
    var string = '';
    var i = 0;
    var c = 0;
    var c1 = 0;
    var c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }

    return string;
  };

  cup.base64Encode = cup.base64.encode = function (input) {
    var output = '';

    if ('btoa' in root) {
      output = root.btoa(unescape(encodeURIComponent(input)));
    } else {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = cup.base64._utf8_encode(input);

      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output +
          this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      }
    }
    return output;
  };

  cup.base64Decode = cup.base64.decode = function (input) {
    var output = '';

    if ('atob' in root) {
      output = decodeURIComponent(escape(root.atob(input)));
    } else {
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {
        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }

      }

      output = cup.base64._utf8_decode(output);
    }
    return output;
  };

  cup.cookie = {};

  cup.cookieGet = cup.cookie.get = function(key, defval) {
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    for(var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = cup.url.decode(parts[0]);
      if(key && key === name)
        return cup.url.decode(parts[1]);
    }
    return defval;
  };

  cup.cookieSet = cup.cookie.set = function(key, val, opts) {
    opts = opts || {};

    if (cup.is.num(opts))
      opts = { expires: opts };

    if (cup.is.num(opts.expires)) {
      var days = opts.expires,
          t = opts.expires = new Date();
      t.setTime(+t + days * 864e+5);
    }

    return document.cookie = [
            cup.url.encode(key), '=', cup.url.encode(val),
            opts.expires ? '; expires=' + opts.expires.toUTCString() : '',
            opts.path    ? '; path=' + opts.path : '',
            opts.domain  ? '; domain=' + opts.domain : '',
            opts.secure  ? '; secure' : ''
          ].join('');
  };

  cup.cookieDel = cup.cookie.del = function(key) {
    if(cup.cookie.get(key) === undefined) return false;
    cup.cookie.set(key, '', {expires: -1});
    return !cup.cookie.get(key);
  };

  cup.cookieKeys = cup.cookie.keys = function() {
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var arr = [];
    for(var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = parts[0];
      arr.push(name);
    }
    return arr;
  };

  cup.db = {};

  cup.db.prefix = 'cup_db_';

  cup.dbGet = cup.db.get = function(key, defval) {
    var val = cup.support.localStorage ?
                root.localStorage.getItem(key) :
                cup.cookie.get(cup.db.prefix + key);
    return val ? cup.is.json(val) ? cup.json.parse(val) : val : defval;
  };

  cup.dbSet = cup.db.set = function(key, val) {
    var _v = val;
    if(!cup.is.str(val))
      _v = cup.json.stringify(val);
    cup.support.localStorage ?
      root.localStorage.setItem(key, _v) :
      cup.cookie.set(cup.db.prefix + key, _v);
  };

  cup.dbDel = cup.db.del = function(key) {
    cup.support.localStorage ?
      root.localStorage.removeItem(key) :
      cup.cookie.del(cup.db.prefix + key);
  };

  cup.dbSize = cup.db.size = function() {
    var len = 0;
    if (cup.support.localStorage) {
      len = root.localStorage.length;
    } else {
      var keys = cup.cookie.keys();
      for (var i = 0, l = keys.length; i < l; i++)
        if (keys[i].indexOf(cup.db.prefix) === 0)
          len++;
    }
    return len;
  };

  cup.dbKeys = cup.db.keys = function () {
    var arr = [];
    if (cup.support.localStorage) {
      for (var i = 0, l = root.localStorage.length; i < l; i++) {
        arr.push(root.localStorage.key(i));
      }
    } else {
      var keys = cup.cookie.keys();
      for (var i = 0, l = keys.length; i < l; i++)
        if (keys[i].indexOf(cup.db.prefix) === 0)
          arr.push(keys[i].substr(cup.db.prefix.length));
    }
    return arr;
  };

  cup.html = {};

  cup.htmlEncode = cup.html.encode = function (html) {
    var s = cup.conv.str(html);
    if (cup.is.empty(s)) return '';
    return s.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/ /g, '&nbsp;')
            .replace(/\'/g, '&#39;')
            .replace(/\"/g, '&quot;')
            .replace(/\n/g, '<br>');
  };

  cup.htmlDecode = cup.html.decode = function (html) {
    var s = cup.conv.str(html);
    if (cup.is.empty(s)) return '';
    return s.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&nbsp;/g, ' ')
            .replace(/&#39;/g, '\'')
            .replace(/&quot;/g, '"')
            .replace(/<br>/g, '\n');
  };

  cup.template = {};

  cup.template.cache = [];

  cup.templateParse = cup.template.parse = function (tpl, data, cache) {
    var reg       = /<%(.+?)%>/g,
        jsReg     = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
        code      = 'with(obj) { var __r__ = [];\n',
        cursor    = 0,
        result,
        match,
        cacheCode = '';

    if (cache)
      cacheCode = cup.db.get(cache);

    if (!cacheCode) {
      var add = function (line, js) {
        var isRaw = js && line && line.charAt(0) === '=';
        if (isRaw) line = line.substr(1);

        line = cup.trim(line);

        if (js && line.match(jsReg)) {
          code += line + '\n';
          return add;
        }
        code += '__r__.push(';

        if (js)
          code += isRaw ? line : 'cup.html.escape(' + line + ')';
        else
          code += '"' + line.replace(/"/g, '\\"') + '"';

        code += ');\n';
        return add;
      };

      while (match = reg.exec(tpl)) {
        add(tpl.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
      }

      add(tpl.substr(cursor, tpl.length - cursor));
      code = (code + 'return __r__.join(""); }').replace(/[\r\t\n]/g, '');

      if (cache)
        cup.db.set(cache, code);
    } else {
      code = cacheCode;
    }

    try {
      result = new Function('obj', code).apply(data, [data]);
    } catch (e) {
      cup.cl.err("'" + e.message + "'", 'in \n\n Code: \n', code, '\n');
    }
    return result;
  };

  cup.event = {};

  cup.event.stop = function (e) {
    if ('stopPropagation' in e)
      e.stopPropagation();
    else
      e.returnValue = false;
  };

  cup.websocket = function (opts) {
    try {
      var socket = new WebSocket(opts.url);
      socket.onopen = opts.open || cup.noop;
      socket.onclose = opts.close || cup.noop;
      socket.onmessage = opts.message || cup.noop;
      socket.onerror = opts.error || cup.noop;
      return socket;
    } catch (e) {
      return null;
    }
  };

  if (typeof define === 'function' && define.amd) {
    define('cup', [], function () {
      return cup;
    });
  }

  cup._s4_ = function () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  cup.guid = function (clear) {
    var s4 = cup._s4_;
    var result = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    return clear ? result.replace(/-/g, '') : result;
  };

}.call(this));

(function() {
  var root = this

  var cup = function(obj) {
    if (obj instanceof cup) return obj
    if (!(this instanceof cup)) return new cup(obj)
  }

  root.cup = cup


  cup.noop = function() {}


  cup.reg = {}

  cup.regEscape = cup.reg.escape = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  cup.regIP = cup.reg.ip = /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/

  cup.regEmail = cup.reg.email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  

  cup.is = {}

  cup.isObject = cup.is.obj = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  cup.isReg = cup.is.reg = function(reg) {
    return Object.prototype.toString.call(reg) === '[object RegExp]'
  }

  cup.isNumber = cup.is.num = function(n) {
    return typeof n === 'number'
  }

  cup.isFunction = cup.is.func = function(f) {
    return typeof f === 'function'
  }

  cup.isString = cup.is.str = function(str) {
    return typeof str === 'string'
  }

  cup.isArray = cup.is.array = function(arr) {
    return 'isArray' in Array ? Array.isArray(arr)
              : Object.prototype.toString.call(arr) === '[object Array]'
  }

  cup.isLink = cup.is.link = function(link) {
    try {
      var a = document.createElement('a')
      a.href = link
      return a.href ? true : false
    } catch (e) {
      return false
    }
  }

  cup.isIP = cup.is.ip = function(ip) {
    return cup.reg.ip.test(ip)
  }

  cup.isEmail = cup.is.email = function (email) {
	return cup.reg.email.test(email)
  }

  cup.isMobile = cup.is.mobile = function () {
  	var result = false;
  	if (/AppleWebKit.*Mobile/i.test(navigator.userAgent)
		|| /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent)
		|| window.location.href.indexOf("?mobile") != -1
		|| /Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  		result = true;
  	}
  	return result;
  }


  cup.trim = function (str, trim) {

  	if (!trim && 'trim' in String.prototype) {
  		return String.prototype.trim.call(str)
  	}

  	var whitespace = trim || ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'

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

  	return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
  }

  cup.round = function(num, fix, isTrim) {
    var r = parseFloat(num)
    if (fix) {
      r = r.toFixed(fix)
    }
    if (isTrim) {
      if (parseInt(r) == r) {
        r = parseInt(r)
      }
    }
    return r
  }

  cup.setParent = function(obj) {
    if (!obj) return
      for (var o in obj) {
        if (cup.isObject(obj) && obj[o] && o !== 'parent') {
          obj[o].parent = obj
          cup.setParent(obj[o])
        }
      }
  }


  cup.json = {}

  cup.jsonParse = cup.json.parse = function(str) {
    if (cup.is.str(str)) {
      if ('JSON' in root || JSON)
        return JSON.parse(str)
      else
        return eval('(' + str + ')')
    } else {
      return str
    }
  }

  cup.jsonStringify = cup.json.stringify = function(json) {
    return root.JSON.stringify(json)
  }
  

  cup.url = {}

  cup.decodeUrl = cup.url.decode = function(url) {
    if ('decodeURIComponent' in root)
      return decodeURIComponent(url)
    return unescape(url)
  }
  
  cup.encodeUrl = cup.url.encode = function(url) {
    if ('decodeURIComponent' in root)
      return encodeURIComponent(url)
    return escape(url)
  }

  cup.getFullUrl = cup.url.full = function(url) {
    if(!cup.is.str(url))
      return url
    return url.indexOf('http://') != 0 ? 'http://' + url : url
  }
  
  cup.getUrlHost = cup.url.host = function(url) {
    if(!cup.is.str(url))
      return url

    var host = ''

    var getHost = function(val) {
      if (val.indexOf('http://') == 0)
        val = val.replace('http://', '')
      ['/', '?', ':'].forEach(function(s) {
        var i = val.indexOf(s)
        if (i > -1)
          val = val.substr(0, i)
      })
      return val
    }

    try {
      if('URL' in root && 'host' in URL)
        host = (new URL(url)).host
      else
        host = getHost(url)
    } catch (e) {
      host = getHost(url)
    }

    return host
  }

  cup.base64 = {}

  cup.base64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

  cup.base64._utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n")
  	var utftext = ""

  	for (var n = 0; n < string.length; n++) {
  	  var c = string.charCodeAt(n)

  	  if (c < 128) {
  	    utftext += String.fromCharCode(c)
  	  }
  	  else if ((c > 127) && (c < 2048)) {
  		utftext += String.fromCharCode((c >> 6) | 192)
  		utftext += String.fromCharCode((c & 63) | 128)
  	  }
  	  else {
  		utftext += String.fromCharCode((c >> 12) | 224)
  		utftext += String.fromCharCode(((c >> 6) & 63) | 128)
  		utftext += String.fromCharCode((c & 63) | 128)
  	  }
  	}

  	return utftext;
  }

  cup.base64._utf8_decode = function (utftext) {
  	var string = ""
  	var i = 0
  	var c = c1 = c2 = 0

  	while (i < utftext.length) {
  	  c = utftext.charCodeAt(i)

  	  if (c < 128) {
  	    string += String.fromCharCode(c)
  		i++
  	  }
  	  else if ((c > 191) && (c < 224)) {
  		c2 = utftext.charCodeAt(i + 1)
  		string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
  		i += 2
  	  }
  	  else {
  		c2 = utftext.charCodeAt(i + 1)
  		c3 = utftext.charCodeAt(i + 2)
  		string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
  		i += 3
  	  }
  	}

  	return string
  }

  cup.base64.encode = function (input) {
  	var output = ""

  	if ('btoa' in root) {
 	  output = root.btoa(input)
  	} else {
  	  var chr1, chr2, chr3, enc1, enc2, enc3, enc4
  	  var i = 0

  	  input = cup.base64._utf8_encode(input)

  	  while (i < input.length) {
		chr1 = input.charCodeAt(i++)
  		chr2 = input.charCodeAt(i++)
  		chr3 = input.charCodeAt(i++)

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
		  this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
  	  }
  	}
  	return output
  }

  cup.base64.decode = function (input) {
  	var output = ""

  	if ('atob' in root) {
  		output = root.atob(input)
  	} else {
  	  var chr1, chr2, chr3
  	  var enc1, enc2, enc3, enc4
  	  var i = 0

  	  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "")

  	  while (i < input.length) {
 		enc1 = this._keyStr.indexOf(input.charAt(i++))
  		enc2 = this._keyStr.indexOf(input.charAt(i++))
  		enc3 = this._keyStr.indexOf(input.charAt(i++))
  		enc4 = this._keyStr.indexOf(input.charAt(i++))

  		chr1 = (enc1 << 2) | (enc2 >> 4)
  		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
  		chr3 = ((enc3 & 3) << 6) | enc4

  		output = output + String.fromCharCode(chr1)

  		if (enc3 != 64) {
  		  output = output + String.fromCharCode(chr2)
  		}
  		if (enc4 != 64) {
  		  output = output + String.fromCharCode(chr3)
  		}

  	  }

  	  output = Base64._utf8_decode(output);
  	}
  	return output
  }

  cup.websocket = function (opts) {
  	try {
  	  var socket = new WebSocket(opts.url)
  	  socket.onopen = opts.open || cup.noop
  	  socket.onclose = opts.close || cup.noop
  	  socket.onmessage = opts.message || cup.noop
  	  socket.onerror = opts.error || cup.noop
  	  return socket
  	} catch (e) {
	  return null
  	}
  }

}.call(this))

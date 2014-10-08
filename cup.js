(function() {
  var root = this

  var cup = function(obj) {
    if (obj instanceof cup) return obj
      if (!(this instanceof cup)) return new cup(obj)
  }

  root.cup = cup

  var reg = {
    ip: /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/g
  }

  cup.noop = function() {}

  cup.isIP = function(t) {
    return reg.ip.test(t)
  }

  cup.isObject = function(obj) {
    var type = typeof obj
    return type === 'object' && !! obj
  }

  cup.isFunction = function(f) {
    var type = typeof f
    return type === 'function'
  }

  cup.isString = function(str) {
    var type = typeof str
    return type === 'string'
  }

  cup.isArray = function(ele) {
    if ('isArray' in Array) {
      return Array.isArray(ele)
    } else {
      return Object.prototype.toString.call(ele) === '[object Array]'
    }
  }

  cup.isUrl = function(url) {
    try {
      var a = document.createElement('a')
      a.href = url
      return a.href ? true : false
    } catch (e) {
      return false;
    }
  }

  cup.round = function(num, fix, isTrim) {
    r = parseFloat(num);
    if (fix) {
      r = r.toFixed(fix);
    }
    if (isTrim) {
      if (parseInt(r) == r) {
        r = parseInt(r);
      }
    }
    return r;
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

  cup.toJson = function(data) {
    if (cup.isString(data)) {
      if (root.JSON) {
        return root.JSON.parse(data)
      } else {
        return eval('(' + data + ')')
      }
    } else {
      return data
    }
  }

  cup.jsonToStr = function(json) {
    if (root.JSON) {
      return root.JSON.stringify(json)
    }
  }

  cup.decodeUri = function(uri) {
    if (root.decodeURIComponent) {
      return root.decodeURIComponent(uri)
    }
    if (root.decodeURI) {
      return root.decodeURI(uri)
    }
    return root.unescape(uri)
  }

  cup.encodeUri = function(uri) {
    if (root.encodeURIComponent) {
      return root.encodeURIComponent(uri)
    }
    if (root.encodeURI) {
      return root.encodeURI(uri)
    }
    return root.escape(uri)
  }

  cup.escapeReg = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  cup.getFullUrl = function(url) {
    if (!url) return url
      if (url.indexOf('http://') != 0) {
        url = 'http://' + url
      }
      return url
  }

  cup.getHost = function(url) {
    var host = url
    var process = function(val) {
      if (val.indexOf('http://') == 0)
        val = val.replace('http://', '');
      if (val.indexOf('/') > -1)
        val = val.substr(0, val.indexOf('/'));
      host = val;
    }
    try {
      if (root.URL && 'host' in root.URL) {
        host = new URL(url).host;
      } else {
        process(url);
      }
    } catch (e) {
      process(url);
    }
    return host;
  }

  cup.webSocket = function(opts) {
    var socket = new WebSocket(opts.url);
    socket.onopen = opts.open || cup.noop;
    socket.onclose = opts.close || cup.noop;
    socket.onmessage = opts.message || cup.noop;
    socket.onerror = opts.error || cup.noop;
    return socket;
  }

}.call(this))

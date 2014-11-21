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

  cup.regIP = cup.reg.ip = /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/g
  


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


  cup.websocket = function(opts) {
    var socket = new WebSocket(opts.url)
    socket.onopen = opts.open || cup.noop
    socket.onclose = opts.close || cup.noop
    socket.onmessage = opts.message || cup.noop
    socket.onerror = opts.error || cup.noop
    return socket
  }

}.call(this))

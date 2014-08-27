(function() {
  var root = this

  var cup = function (obj) {
    if (obj instanceof cup) return obj
    if (!(this instanceof cup)) return new cup(obj)
  }

  root.cup = cup

  cup.isObject = function (obj) {
    var type = typeof obj
    return type === 'object' && !! obj
  }

  cup.setParent = function (obj) {
    if (!obj) return
    for (var o in obj) {
      if (cup.isObject(obj) && o !== 'parent') {
        obj[o].parent = obj
        cup.setParent(obj[o])
      }
    }
  }

}.call(this))

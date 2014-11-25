## cup.js

属于自己用的一个辅助性类库，类似underscore。

## API 说明

### 验证相关

##### `cup.is.obj`或`cup.isObject`
检查一个变量是否是对象（**该检测只针对{}的情况，array非对象**)

```javascript
cup.is.obj({}) //true
cup.is.obj([]) //false
```

---

##### `cup.is.arr`或`cup.isArray`
检查一个变量是否是数组

```javascript
cup.is.obj([]) //true
cup.is.obj({}) //false
```
---

##### `cup.is.func`或`cup.isFunction`
检查一个变量是否是函数

```javascript
cup.is.obj(function () {}) //true
```

---

##### `cup.is.str`或`cup.isString`
检查一个变量是否是字符串

```javascript
cup.is.str('') //true
```

---

##### `cup.is.num`或`cup.isNumber`
检查一个变量是否是数字

```javascript
cup.is.num(1) //true
```

---

##### `cup.is.ip`或`cup.isIP`
检查一个变量是否是合法IP地址

```javascript
cup.is.ip('192.168.1.1') //true
```

---

### 数据存储
默认使用localStorage实现，如果浏览器不支持localStorage则用cookie

##### `cup.db.set`
设置存储区内容，如果内容是对象或者数组会自动序列化成字符串

```javascript
cup.set('a', {x: 1, y: 2});
cup.set('b', [1, 2, 3]);
cup.set('c', 1);
cup.set('d', 'hello')
```

##### `cup.db.get`
获取存储区里面的内容，如果内容是对象或者数组会自动序列化成对象或者数组

```javascript
cup.db.get('a') // {x: 1, y: 2}
cup.db.get('b') // [1, 2, 3]
cup.db.get('c') // 1
cup.db.get('d') // 'hello'
```

##### `cup.db.del`
删除存储区内容

```javascript
cup.db.del('a')
cup.db.get('a') //undefined
```

---

### 模板引擎
采用正则替换生成函数，函数再生成HTML字符串方式，并未加上安全性的措施，请用于可信任的内容生成。

##### `cup.template.parse`

```javascript
cup.template.parse('<h1><% title %></h1>', {title: 'hxy'})
//<h1>hxy</h1>
```

语法为在`<% %>`里面放置对象变量名则为直接输出变量内容，
可以在`<% %>`里面使用`var|if|for|else|switch|case|break`等js语句会转换成相应地逻辑。

```javascript
var tmpl = '<h1><% title %></h1>'
          +'<ul>'
          +'<% for(vari=0;i<list.length;i++) {%>'
          +'<li><% list[i].url %></li>'
          +'<% } %>'
          +'</ul>';
var data = {
            title: 'hxy',
            list: [
              {url: 'www.google.com'},
              {url: 'www.facebook.com'},
              {url: 'www.twitter.com'}
            ]}
var html = cup.template.parse(tmpl, data);
/*
<h1>hxy</h1>
<ul>
<li>www.google.com</li>
<li>www.facebook.com</li>
<li>www.twitter.com</li>
</ul>
*/

```

##### 使用缓存
如果模板比较大，里面的逻辑结构比较多和复杂的话，推荐使用缓存机制，这样效率会大大提升，
如果只是很简单的模板，则不推荐用缓存。

首次模板渲染的时候会将编译好的模板函数放入`cup.db`中，第二次渲染时则直接在`cup.db`中获取模板函数执行

```javascript
cup.template.parse('<h1><% title %></h1>', {title: 'hxy'}, 'pagetitle')
```

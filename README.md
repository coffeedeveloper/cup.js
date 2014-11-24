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

##### `cup.is.arr`或`cup.isArray`
检查一个变量是否是数组

```javascript
cup.is.obj([]) //true
cup.is.obj({}) //false
```

##### `cup.is.func`或`cup.isFunction`
检查一个变量是否是函数

```javascript
cup.is.obj(function () {}) //true
```

##### `cup.is.str`或`cup.isString`
检查一个变量是否是字符串

```javascript
cup.is.str('') //true
```
##### `cup.is.num`或`cup.isNumber`
检查一个变量是否是数字

```javascript
cup.is.num(1) //true
```

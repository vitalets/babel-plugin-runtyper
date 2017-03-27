
Disadvantages:
* need code annotations
* need annotated third-party libraries

https://flowtype.org/try/


#### Strict equal
```js
function isOne(x) {
  return x === 1;
}

isOne('1'); // no errors
```

#### Undefined variables
```js
function sqr(x) {
  return x * x;
}

let b;

(function() {
  sqr(b); // no errors
})();
```

#### External data
```js
function foo(x) {
  return x * 10;
}

window.document.getElementById('username').addEventListener('change', function (event) {
  foo(event.target.value)
});
```

# Runtyper
> [Babel](https://babeljs.io) plugin for runtime type-checking in JavaScript

Use Runtyper in your *development builds* and it will throw error every time
when some operation is applied to inconsistent types. No annotations needed.

## Example
When somewhere in code you have comparison like `x === y` and in runtime `x = 1`, `y = "1"`, 
you will get unexpected `false` result due to missing type conversion.  
After applying Runtyper it will notify you about such situation as soon as it occurs:
(screenshot 1)

## Install
```bash
npm install --save-dev babel-plugin-runtyper
```

## Usage
Just add `babel-plugin-runtyper` to babel config in *development builds*.  
For example, in `package.json` scripts:
```json
"scripts": {
  "babel-dev": "babel in.js -o out.js --plugins=babel-plugin-runtyper"
}
``` 
or directly in terminal: 
```bash
babel in.js -o out.js --plugins=babel-plugin-runtyper
```
No changes to your existing codebase needed.

## How it works
Basically it wraps all type-important places into function that additionally performs type checking. 
Currently strict comparison `===, !==` and numeric operations `+,-,*,/,%` are wrapped.  
Before: 
```js
if (x === y) { ... }
```
After:
```js
if (strictEqual(x, y)) { ... }
```

## Compare to static tools
Static code analysis is another approach to type checking. 
There are Microsoft's [TypeScript](http://www.typescriptlang.org) and Facebook's [Flow](https://flowtype.org).
They can be used together with *Runtyper* to cover most cases in both pre-runtime and runtime stages.

Also using static tools requires extra efforts for:
* writing annotations (it's really annoying me, personally =)
* integration with third-party libraries as their API should be type-annotated)
* processing external data from user or server 
* involving new members who is not familiar with typed JavaScript

Lets take an example from [Flow's get started page](https://flowtype.org/en/docs/getting-started/):
```js
// @flow
function square(n) {
  return n * n; // Error!
}

square("2", "2");
```

but if I have textfield and will call `square()` with user's input - error will not be found: 
```js
// @flow
function square(n) {
  return n * n; // no Error, until you annotate `event.target.value`
}

window.document.getElementById('username').addEventListener('change', function (event) {
  square(event.target.value);
});
```
You can try it here: https://flowtype.org/try/

`Runtyper` allows to catch such cases:
(screenshot 2)

So use both approaches to make your applications more robust and reliable.

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

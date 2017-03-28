# Runtyper
[![Build Status](https://travis-ci.org/vitalets/babel-plugin-runtyper.svg?branch=master)](https://travis-ci.org/vitalets/babel-plugin-runtyper)
[![npm](https://img.shields.io/npm/v/babel-plugin-runtyper.svg)](https://www.npmjs.com/package/babel-plugin-runtyper)
[![license](https://img.shields.io/npm/l/babel-plugin-runtyper.svg)](https://www.npmjs.com/package/babel-plugin-runtyper)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/vitalets/babel-plugin-runtyper.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fvitalets%2Fbabel-plugin-runtyper&text=Runtime%20type%20checker%20for%20JavaScript%20without%20annotations%3A&hashtags=javascript%2C%20type-checking%2C%20babel-plugin)

> [Babel](https://babeljs.io) plugin for runtime type-checking in JavaScript

Use Runtyper in your *development builds* to be notified every time
when some operation is applied to inconsistent types. No annotations needed.

## Example
Imagine you have comparison like `x === y` and in runtime values are `x = 1`, `y = "1"`.
When executed you will silently get unexpected `false` result due to missing type conversion.  
After applying Runtyper it will throw error to console as soon as such situation occur:

![runtyper warning](https://cloud.githubusercontent.com/assets/1473072/24371480/926108e8-1333-11e7-8e17-0223ed0c21ad.png)

## Install
1. Ensure you have [babel installed](https://babeljs.io/docs/setup/)
2. Run in terminal:
  ```bash
  npm install --save-dev babel-plugin-runtyper
  ```

## Usage 
1. No changes to your existing codebase needed!
2. Just add `babel-plugin-runtyper` to babel config in *development builds*.  
    For example, directly in terminal: 
    ```bash
    babel in.js -o out.js --plugins=babel-plugin-runtyper
    ```
    or in `package.json` scripts:
    ```json
    "scripts": {
      "babel-dev": "babel in.js -o out.js --plugins=babel-plugin-runtyper"
    }
    ``` 
    or with [webpack babel-loader](https://webpack.js.org/loaders/babel-loader/):
    ```js
    {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
            plugins: [
                ['babel-plugin-runtyper', {enabled: process.env.NODE_ENV !== 'production'}]
            ]
        }
    }
    ```
    > Please note to run webpack as `NODE_ENV='production' webpack -p` (see [#2537](https://github.com/webpack/webpack/issues/2537))

3. Enable source-maps to see original place of error (if not yet):
  * In browser enable it in devtools settings
  * In Node.js you should use [source-map-support](https://github.com/evanw/node-source-map-support) package:
      ```js
      require('source-map-support').install();
      ```


## How it works
Basically it wraps all type-important places into function that additionally performs type checking. 
Currently strict comparison `===, !==` and numeric operations `+, -, *, /, %` are wrapped.  
Before: 
```js
if (x === y) { ... }
```
After:
```js
if (strictEqual(x, y)) { ... }
```

## Options

* `enabled` - is plugin enabled (default: `true`)
* `allowStringNumberConcat` - allows concatenating of strings and numbers (default: `false`)

## Compare to static tools
Static code analysis is another approach to type checking. 
For example, there are Microsoft's [TypeScript](http://www.typescriptlang.org) and Facebook's [Flow](https://flowtype.org).
They can be used together with Runtyper to cover most of cases in both pre-runtime and runtime stages.

I'am personally a bit confused with static tools as they require extra efforts for:
* Writing annotations (annoying)
* Integration with third-party libraries (as their API should be also annotated)
* Processing external data from user / server (many different types and formats)
* Involving new members (who is not familiar with typed JavaScript)

Let's take an example from [Flow's get started page](https://flowtype.org/en/docs/getting-started/):
```js
// @flow
function square(n) {
  return n * n; // Error!
}

square("2", "2");
```

but if I have textfield and use `square()` to handle user's input - error will not be found: 
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

Runtyper allows to catch such cases:

![runtyper warning textfield](https://cloud.githubusercontent.com/assets/1473072/24371601/f8d10ab0-1333-11e7-8baf-6b6501accd29.png)

So consider both approaches to make your applications more robust and reliable.

## FAQ
1. **Why I get error for [template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals) like `${name}${index}`?**  
   Likely you are using [babel-preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/) that transforms template literals into concatenation via `+`.
   And you get `(string) + (number)`. You can fix it in several ways:
    * set plugin option `allowStringNumberConcat: true`
    * add explicit conversion: `${name}${String(index)}`
    * consider using [babel-preset-env](https://babeljs.io/docs/plugins/preset-env/) as template literals are widely supported natively


## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

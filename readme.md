# Runtyper
[![Build Status](https://travis-ci.org/vitalets/babel-plugin-runtyper.svg?branch=master)](https://travis-ci.org/vitalets/babel-plugin-runtyper)
[![npm](https://img.shields.io/npm/v/babel-plugin-runtyper.svg)](https://www.npmjs.com/package/babel-plugin-runtyper)
[![license](https://img.shields.io/npm/l/babel-plugin-runtyper.svg)](https://www.npmjs.com/package/babel-plugin-runtyper)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/vitalets/babel-plugin-runtyper.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fvitalets%2Fbabel-plugin-runtyper&text=Runtime%20type%20checker%20for%20JavaScript%20code%20without%20annotations%3A&hashtags=javascript%2C%20type-checking%2C%20babel-plugin)

> [Babel](https://babeljs.io) plugin for runtime type-checking in JavaScript code

Runtyper notifies you about all type-mismatch operations in your JavaScript code.
Include it into your *development builds* and it will throw error every time it detects weirdness. No type-annotations needed.

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
2. Add `babel-plugin-runtyper` to babel config in *development builds*.  
    For example, directly in terminal: 
    ```bash
    babel in.js -o out.js --plugins=babel-plugin-runtyper --source-maps
    ```
    or in `package.json` scripts:
    ```json
    "scripts": {
      "babel-dev": "babel in.js -o out.js --plugins=babel-plugin-runtyper --source-maps"
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

3. Enable source-maps to see original place of error:
  * In Chrome set `Enable JavaScript source maps` in devtools settings
  * In Firefox please follow [this instruction](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Console_messages#Source_maps)
  * In Node.js use [source-map-support](https://github.com/evanw/node-source-map-support) package:
      ```js
      require('source-map-support').install();
      ```

> Tip: checkout [examples](examples) directory in this repo to see browser and Node.js demos


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

## Configuration
To configure plugin pass it to babel as array:
```js
  plugins: [
      ['babel-plugin-runtyper', options]
  ]
```
**Options**

| Name                     | Values                                    | Default          | Description  |
| ------------------------ | ----------------------------------------- |------------------| ------------ |
| `enabled`                | `true`, `false`                           | `true`           | Is plugin enabled            |
| `defaultLevel`           | `"allow"`, `"warn"`, `"error"`, `"break"` | `"warn"`         | Default notification level for all rules             |
| `concatStringNumber`     | `"allow"`, `"warn"`, `"error"`, `"break"` | `<defaultLevel>` | Rule for `(string) + (number)`             |
| `strictCompareNull`      | `"allow"`, `"warn"`, `"error"`, `"break"` | `<defaultLevel>` | Rule for `(any type) === null`             |
| `strictCompareUndefined` | `"allow"`, `"warn"`, `"error"`, `"break"` | `<defaultLevel>` | Rule for `(any type) === undefined`             |


**Level description**
 
 * `allow` - no notifications
 * `warn` - type-mismatch will be notified via `console.warn`
 * `error` - type-mismatch will be notified via `console.error`
 * `break` - type-mismatch will throw error and break execution 

## Compare to static tools
Static code analysis is also the way to perform type checking in your application. 
For example, there is Facebook's [Flow](https://flowtype.org) project.
It can be used together with Runtyper to detect errors on both pre-runtime and runtime stages.

Yet, static tools require extra efforts for:
* Writing type-annotations (may be annoying)
* Integration with third-party libraries (as their API should be also annotated)
* Processing external events from user / server (different and changing formats)
* Involving new members (who is not familiar with typed JavaScript)

Let's take an example from [Flow's get started page](https://flowtype.org/en/docs/getting-started/):
```js
// @flow
function square(n) {
  return n * n; // Error!
}

square("2");
```

But if `square()` is used to handle user's input from textfield - error will not be found: 
```js
// @flow
function square(n) {
  return n * n; // no Error, until you annotate `event.target.value`
}

window.document.getElementById('username').addEventListener('change', function (event) {
  square(event.target.value);
});
```

Runtyper allows to catch such cases:

![runtyper warning textfield](https://cloud.githubusercontent.com/assets/1473072/24371601/f8d10ab0-1333-11e7-8baf-6b6501accd29.png)

So consider both approaches to make your applications more robust and reliable.

## FAQ
1. **Why I get error for [template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals) like `${name}${index}`?**  
   Likely you are using [babel-preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/) that transforms template literals into concatenation via `+`.
   And you get `(string) + (number)`. You can fix it in several ways:
    * set plugin option `concatStringNumber: "allow"`
    * add explicit conversion: `${name}${String(index)}`
    * consider using [babel-preset-env](https://babeljs.io/docs/plugins/preset-env/) as template literals are widely supported natively

> In case of other questions or ideas please feel free to [file new issue](https://github.com/vitalets/babel-plugin-runtyper/issues/new).

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)

# Runtyper in Node.js

Build:
```bash
babel ./app.js -o ./app.instrumented.js --plugins=babel-plugin-runtyper --source-maps
```

Run:
```bash
node ./index.js
```

Result:
```
Error: Numeric operation with non-numeric value: "Hello World!" (string) * "Hello World!" (string)
    at multiply (app.js:4:3)
    at Object.exports.square (app.js:4:3)
```

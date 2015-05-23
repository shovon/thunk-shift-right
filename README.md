# Wrap asynchronous thunks to shift callback parameters right

```javascript
// Without `shiftCallbackParamsRight`

var thunk = thunkify(asyncFunc);

thunk(function (data) {
  // It's a bad idea to have the first parameter represent data.
});

// With `shiftCallbackParamsRight`

var thunk = shiftParamsRight(thunkify(asyncFunc));

thunk(function (err, data) {
  // Now, data is on the right, and `err` is always going to be null
});
```

## Usage

Install `thunk-shift-right` using npm:

```shell
npm install thunk-shift-right
```

Then import it, and use it to wrap an asynchronous thunk (in this case, the asynchronous thunk is generated using [`thunkify`](https://github.com/tj/node-thunkify)):

```javascript
var thunkify = require('thunkify');
var shiftCallbackParamsRight = require('thunk-shift-right');

var thunk = shiftCallbackParamsRight(function asyncFunc(callback) {
  setImmediate(function () {
    callback('Some valid, non-error data');
  });
});
```

## Use case

This is especially useful with [`co`](https://github.com/tj/co), where it assumes that the first parameter passed in to the callback always represents an error, when in reality, it doesn't (the following code is using the [ES6 syntax](https://github.com/lukehoban/es6features)).

```javascript
// Without `shiftCallbackParamsRight`

let thunk = thunkify(function (callback) {
  setImmediate(function () {
    // N.B.: the first parameter passed-in to the callback is NOT an error!
    // However, because of that, `co` will always assume that a non-falsy value
    // passed-in to the callback is an error!
    callback('Some valid, non-error data');
  });
});

co(function *() {
  const value = yield thunk();
  // -> **CRASH**! We have an error!

  // The following code, and any additional code in this function will not be
  // run because the above code raised an exception!
  console.log(value);
});

// With `shifParamsRight`

let thunk = shiftCallbackParamsRight(thunkify(function (callback) {
  setImmediate(function () { callback('Some valid, non-error data'); })
}));

co(function *() {
  const value = yield thunk();

  console.log(value);
  // -> 'Some valid, non-error data'
});
```

## License

`thunk-shift-right` is [MIT-Licensed](https://github.com/shovon/thunk-shift-right/blob/master/LICENSE)
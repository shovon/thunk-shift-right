'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = shiftCallbackParamsRight;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _idempotent = require('idempotent');

/**
 * Accepts an asynchronous thunk, and has it so that the passed-in callback has
 * all of the parameters shifted to the right.
 *
 * @param {Function} thunk
 * @return {Function}
 */

function shiftCallbackParamsRight(thunk) {

  return function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    return function (callback) {
      thunk.apply(undefined, params)(function () {
        for (var _len2 = arguments.length, subParams = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          subParams[_key2] = arguments[_key2];
        }

        callback.apply(undefined, _toConsumableArray((0, _idempotent.unshift)(subParams, null)));
      });
    };
  };
}

module.exports = exports['default'];


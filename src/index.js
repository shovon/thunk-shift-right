import { unshift } from 'idempotent';

/**
 * Accepts an asynchronous thunk, and has it so that the passed-in callback has
 * all of the parameters shifted to the right.
 *
 * @param {Function} thunk
 * @return {Function}
 */
export default function shiftCallbackParamsRight(thunk) {

  return (...params) =>
    (callback) => {
      thunk(...params)(function (...subParams) {
        callback(...unshift(subParams, null));
      });
    };

}

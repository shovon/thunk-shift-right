import thunkify from 'thunkify';
import expect from 'expect.js';
import shiftCallbackParamsRight from './src';

describe('shiftCallbackParamsRight', () => {

  it('the thunkified callback should have all its parameters shifted right. The thunk itself should be able to accept an empty parameters list', (done) => {

    const expected = 'Non-error';

    const thunk = shiftCallbackParamsRight(thunkify(function (callback) {
      callback(expected);
    }));

    thunk()(function (err, value) {
      expect(err).to.be(null);
      expect(value).to.be(expected);
      done();
    });

  });

  it('the thunkified callback should have all its parameters shifted right. The thunk itself should be able to accept one more or more parameters', (done) => {

    const expected1 = 'Non-error';
    const expected2 = 'Hello, ';

    const thunk = shiftCallbackParamsRight(thunkify(function (input, callback) {
      callback(expected1, `${expected2}${input}`);
    }));

    thunk('World')(function (err, value1, value2) {
      expect(err).to.be(null);
      expect(value1).to.be(expected1);
      expect(value2).to.be(`${expected2}World`);
      done();
    });

  });

});
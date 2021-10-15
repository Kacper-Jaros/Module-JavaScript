const STATE = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};
export class MyPromise {
  constructor(callback) {

    this.state = STATE.PENDING;
    this.value = undefined;
    this.handlers = [];

    try {
      callback(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  resolve = (value) => {
    this.updateResult(value, STATE.FULFILLED);
  };

  reject = (error) => {
    this.updateResult(error, STATE.REJECTED);
  };

  updateResult(value, state) {
    setTimeout(() => {
      if (this.state !== STATE.PENDING) {
        return;
      }

      this.value = value;
      this.state = state;

      this.executeHandlers();
    }, 0);
  }

  then(onSuccess, onFail) {
    return new MyPromise((res, rej) => {
      this.addHandlers({
        onSuccess: function (value) {
          // if no onSuccess provided, resolve the value for the next promise chain
          if (!onSuccess) {
            return res(value);
          }
          try {
            return res(onSuccess(value));
          } catch (err) {
            return rej(err);
          }
        },
        onFail: function (value) {
          // if no onFail provided, reject the value for the next promise chain
          if (!onFail) {
            return rej(value);
          }
          try {
            return res(onFail(value));
          } catch (err) {
            return rej(err);
          }
        },
      });
    });
  }

  addHandlers(handlers) {
    this.handlers.push(handlers);
    this.executeHandlers();
  }

  executeHandlers() {
    // Don't execute handlers if promise is not yet fulfilled or rejected
    if (this.state === STATE.PENDING) {
      return null;
    }

    // We have multiple handlers because add them for .finally block too
    this.handlers.forEach((handler) => {
      if (this.state === STATE.FULFILLED) {
        return handler.onSuccess(this.value);
      }
      return handler.onFail(this.value);
    });
    // After processing all handlers, we reset it to empty.
    this.handlers = [];
  }

  synchThen(callback) {
    const result = callback();
    return this.then(() => result);
  }
}

let promise = new MyPromise((resolve) => {
  console.log(1);
  resolve();
})
  .synchThen(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });
console.log(4);

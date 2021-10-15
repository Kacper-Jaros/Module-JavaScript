import { MyPromise } from "../1";

class ReversePromise extends MyPromise {
  constructor(fn) {
    super((_) => _());
    this.fn = fn;
    this.stack = [];
  }
  then(fn) {
    this.stack.push(fn);
    return this;
  }

  // not standard to promises
  // but you need some way to
  // say the chaining has completed
  run() {
    const p = new Promise(this.fn);
    let current = p;

    while (this.stack.length) {
      current = current.then(this.stack.pop());
    }

    return p;
  }
}

let promise = new ReversePromise((resolve) => {
  console.log(1);
  resolve();
})
  .then(() => console.log(2))
  .then(() => console.log(3))
  .then(() => console.log(4))
  .run();

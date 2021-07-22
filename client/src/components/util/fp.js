export function debounce(fn, ms) {
  let timer;

  return () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export function throttle(fn, ms) {
  let shouldWait = false;

  return function (...args) {
    if (!shouldWait) {
      fn.apply(this, args);
      shouldWait = true;

      setTimeout(() => {
        shouldWait = false;
      }, ms);
    }
  };
}

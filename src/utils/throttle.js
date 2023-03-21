const throttle = (callbackFunc, delay) => {
  let lastExecTime = 0;

  return (...args) => {
    const now = Date.now();

    if (now - lastExecTime >= delay) {
      callbackFunc(...args);
      lastExecTime = now;
    }
  };
};

export default throttle;

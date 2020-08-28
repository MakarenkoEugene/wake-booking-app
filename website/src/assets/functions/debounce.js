export default function debounce(f, t) {
  let lastCall = null;
  let lastCallTimer = null;

  return function (...args) {
    const previousCall = lastCall;

    lastCall = Date.now();

    if (previousCall && lastCall - previousCall <= t) clearTimeout(lastCallTimer);

    lastCallTimer = setTimeout(() => f(args), t);
  };
}

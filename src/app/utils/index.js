export const isValidStatus = (status) => `${status}`.startsWith('2');
// eslint-disable-next-line arrow-body-style
export const findChanges = (obj, obj1) => {
  return Object
    .fromEntries(Object
      .entries(obj)
      .filter(([key, value]) => (
        // eslint-disable-next-line eqeqeq
        typeof value === 'object' ? JSON.stringify(value) !== JSON.stringify(obj1[key]) : obj1[key] != value
      )));
};

export const removeFalse = (obj) => Object
  .entries(obj)
  .reduce((acum, [key, value]) => (value ? { ...acum, [key]: value } : acum), {});

export const formValidate = (required) => (form, create) => Object
  .entries(required)
  .reduce((acum, [key, test]) => ({ ...acum, [key]: test(key === 'all' ? form : form[key], create) }), {});

export function throttle(func, ms) {
  let toggle = false;
  let savedArgs;
  let savedThis;

  function wrapper(...args) {
    if (toggle) {
      savedArgs = args;
      savedThis = this;
      return;
    }
    func.apply(this, args);

    toggle = true;

    setTimeout(() => {
      toggle = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

export const ControlValueAccessor = <T>() => {
  return target => {
    Object.assign(target.prototype, {
        touch: function () {
          this.touched.forEach(f => f());
        },
        writeValue: function (v) {
          this.innerValue = v;
        },
        registerOnChange: function (fn: (value: T) => void) {
          this.changed.push(fn);
        },
        registerOnTouched: function (fn: () => void) {
          this.touched.push(fn);
        },
    });

    Object.defineProperty(target.prototype, 'value', {
      get: function() {
        return this.innerValue;
      },
      set: function (value) {
        if (this.innerValue !== value) {
          this.innerValue = value;
          this.changed.forEach(f => f(value));
        }
      },
    });

    return target;
  };
};

export const initializeAccessor = accessor => {
  Object.assign(accessor, {
    touched: new Array<() => void>(),
    changed: new Array<(value) => void>(),
    innerValue: null,
  });
};


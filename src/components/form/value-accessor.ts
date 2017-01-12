export abstract class ValueAccessor<T> {
  protected innerValue: T;

  protected touched = new Array<() => void>();
  protected changed = new Array<(value) => void>();

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }

  touch() {
    this.touched.forEach(f => f());
  }

  writeValue(v) {
    this.innerValue = v;
  }

  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }
}

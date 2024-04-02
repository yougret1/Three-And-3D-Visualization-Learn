class SingleEventEmitter extends EventTarget {
  on = this.addEventListener;

  off = this.removeEventListener;

  emit = (type, data) =>
    this.dispatchEvent(new CustomEvent(type, { detail: data }));

  once = (type, listener) =>
    this.on(type, listener, { once: true, capture: true });
}

const eventEmitter = new SingleEventEmitter();

export const on = (type, listener) => {
  eventEmitter.addEventListener(type, listener);
};

export const off = (type, listener) => {
  eventEmitter.removeEventListener(type, listener);
};

export const emit = (type, data) => {
  eventEmitter.dispatchEvent(new CustomEvent(type, { detail: data }));
};

export const once = (type, listener) => {
  eventEmitter.addEventListener(type, listener, { once: true });
};

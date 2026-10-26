type Listener = ((...args: any[]) => void) & { original?: Listener };

class EventEmitter {
  private listeners = new Map<string, Listener[]>();

  on(event: string, listener: Listener): this {
    const list = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...list, listener]);
    return this;
  }
  once(event: string, listener: Listener): this {
    const wrapper: Listener = (...arg) => {
      this.off(event, wrapper);
      listener(...arg);
    };
    wrapper.original = listener;
    return this.on(event, wrapper);
  }

  emit(event: string, ...args: unknown[]): boolean {
    const list = this.listeners.get(event);
    if (!list?.length) {
      if (event === "error") throw args[0] ?? new Error("No listener on error");
      return false;
    }
    list.forEach((fn) => fn(...args));
    return true;
  }

  off(event: string, listener: Listener): this {
    const list = this.listeners.get(event) ?? [];
    this.listeners.set(
      event,
      list.filter((l) => l !== listener && l.original !== listener),
    );
    if (!this.listeners.get(event)?.length) this.listeners.delete(event);
    return this;
  }
}

const e = new EventEmitter();
e.on("a", (arg) => console.log(arg));
e.on("a", (arg) => console.log(arg + "2"));
e.once("b", (arg) => console.log(arg + "once"));
e.emit("a", "test");
e.emit("b", "once1");
e.emit("b", "once2");

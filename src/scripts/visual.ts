export class Visual {
  public ac;
  public signal;
  constructor() {
    this.ac = new AbortController();
    this.signal = this.ac.signal;
  }

  select(a: number, b: number) {
    const el = document.querySelector(`[data-trace="${a}-${b}"]`)!;
    el.classList.add("!bg-blue-700");
  }

  unselect(a: number, b: number) {
    const el = document.querySelector(`[data-trace="${a}-${b}"]`)!;
    el.classList.remove("!bg-blue-700");
  }

  async delayWithSignal() {
    return new Promise((resolve) =>
      setTimeout(resolve, 200, { signal: this.ac.signal })
    );
  }

  abort() {
    this.ac.abort();
  }

  async delay() {
    return new Promise((resolve) =>
      setTimeout(resolve, 200, { signal: this.ac.signal })
    );
  }

  option(a: number, b: number, weight: number) {
    const el = document.querySelector(`[data-trace="${a}-${b}"]`)!;
    el.classList.add("bg-pink-700");
    el.textContent = weight.toString();
  }

  deoption(a: number, b: number) {
    const el = document.querySelector(`[data-trace="${a}-${b}"]`)!;
    el.classList.remove("bg-pink-700");
    el.textContent = "";
  }
}
